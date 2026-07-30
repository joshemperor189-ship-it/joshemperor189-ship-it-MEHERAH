import { Request, Response, Router } from 'express';
import crypto from 'crypto';
import { dbAddAuditLog } from '../../db/service.ts';

export const webhookRouter = Router();

// Production verification middleware for incoming Telco Webhooks
const verifyTelcoSignature = (req: Request, res: Response, next: Function) => {
  const signature = req.headers['x-momo-signature'] as string || req.headers['x-signature'] as string;
  const secret = process.env.MTN_WEBHOOK_SECRET || process.env.AIRTEL_WEBHOOK_SECRET || 'meherah_webhook_secret_key';
  
  // If signature header exists, perform HMAC validation
  if (signature) {
    const computedHash = crypto
      .createHmac('sha256', secret)
      .update(typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
      .digest('hex');

    if (signature !== computedHash && process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Unauthorized payload signature' });
    }
  }
  next();
};

// MTN Mobile Money Webhook Callback Endpoint
webhookRouter.post('/api/v1/callback/mtn', verifyTelcoSignature, async (req: Request, res: Response) => {
  const { financialTransactionId, status, externalId, amount, currency } = req.body;
  
  try {
    const txnId = financialTransactionId || externalId || `MTN-${Date.now()}`;
    const txnStatus = status || 'SUCCESSFUL';
    const txnAmount = amount || 0;

    console.log(`[MTN Webhook Received] Txn ${txnId} status: ${txnStatus} amount: ${txnAmount}`);
    
    // Log in ZK Audit ledger
    await dbAddAuditLog(
      'TELCO_WEBHOOK_MTN',
      `MTN MoMo Callback Processed: Txn ${txnId} (${txnStatus}) - UGX ${txnAmount}`,
      {
        proofHash: `0x${crypto.createHash('sha256').update(`${txnId}:${txnStatus}`).digest('hex').substring(0, 32)}`,
        payload: { financialTransactionId: txnId, status: txnStatus, amount: txnAmount, provider: 'MTN_MOMO' }
      }
    );

    return res.status(200).json({
      status: 'SUCCESS_ACKNOWLEDGED',
      provider: 'MTN_MOMO',
      transactionId: txnId,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[MTN Webhook Error]', error);
    return res.status(500).json({ error: 'Internal processing loop failure', details: error.message });
  }
});

// Airtel Money Webhook Callback Endpoint
webhookRouter.post('/api/v1/callback/airtel', verifyTelcoSignature, async (req: Request, res: Response) => {
  const { transaction_id, status, reference_id, amount } = req.body;
  
  try {
    const txnId = transaction_id || reference_id || `AIRTEL-${Date.now()}`;
    const txnStatus = status || 'SUCCESS';
    const txnAmount = amount || 0;

    console.log(`[Airtel Webhook Received] Txn ${txnId} status: ${txnStatus}`);
    
    await dbAddAuditLog(
      'TELCO_WEBHOOK_AIRTEL',
      `Airtel Money Callback Processed: Txn ${txnId} (${txnStatus}) - UGX ${txnAmount}`,
      {
        proofHash: `0x${crypto.createHash('sha256').update(`${txnId}:${txnStatus}`).digest('hex').substring(0, 32)}`,
        payload: { transactionId: txnId, status: txnStatus, amount: txnAmount, provider: 'AIRTEL_MONEY' }
      }
    );

    return res.status(200).json({
      status: 'SUCCESS_ACKNOWLEDGED',
      provider: 'AIRTEL_MONEY',
      transactionId: txnId,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Airtel Webhook Error]', error);
    return res.status(500).json({ error: 'Internal processing loop failure' });
  }
});

// Stanbic FlexiPay Webhook Callback Endpoint
webhookRouter.post('/api/v1/callback/flexipay', verifyTelcoSignature, async (req: Request, res: Response) => {
  const { flexiTxnRef, statusCode, amount } = req.body;

  try {
    const txnId = flexiTxnRef || `FLEXI-${Date.now()}`;
    const txnStatus = statusCode === '00' ? 'COMPLETED' : statusCode || 'SUCCESS';

    console.log(`[FlexiPay Webhook Received] Ref ${txnId} status: ${txnStatus}`);

    await dbAddAuditLog(
      'BANK_WEBHOOK_FLEXIPAY',
      `Stanbic FlexiPay Callback Processed: Ref ${txnId} (${txnStatus})`,
      {
        proofHash: `0x${crypto.createHash('sha256').update(`${txnId}:${txnStatus}`).digest('hex').substring(0, 32)}`,
        payload: { flexiTxnRef: txnId, statusCode, amount, provider: 'STANBIC_FLEXIPAY' }
      }
    );

    return res.status(200).json({
      status: 'SUCCESS_ACKNOWLEDGED',
      provider: 'STANBIC_FLEXIPAY',
      transactionId: txnId,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[FlexiPay Webhook Error]', error);
    return res.status(500).json({ error: 'Internal processing loop failure' });
  }
});
