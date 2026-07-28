import { Router, Request, Response } from 'express';
import { walletService } from '../wallet/WalletService';
import { savingsEngine } from '../savings/SavingsEngine';
import { loanEngine } from '../lending/LoanEngine';
import { financialCoach } from '../coach/FinancialCoach';
import { treasuryEngine } from '../treasury/TreasuryEngine';

export const organ3Router = Router();

// 1. GET /api/v1/wallet/balance
organ3Router.get('/wallet/balance', (req: Request, res: Response): void => {
  const walletId = (req.query.walletId as string) || 'WAL-MEHERAH-001';
  const wallet = walletService.getBalance(walletId);

  if (!wallet) {
    res.status(404).json({ error: 'Wallet not found' });
    return;
  }

  const ledger = walletService.getLedgerForWallet(wallet.walletId);

  res.json({
    status: 'success',
    wallet,
    ledgerSummary: {
      totalEntries: ledger.length,
      recentEntries: ledger.slice(0, 10)
    }
  });
});

// 2. POST /api/v1/wallet/deposit
organ3Router.post('/wallet/deposit', (req: Request, res: Response): void => {
  const { walletId = 'WAL-MEHERAH-001', amount, currency = 'USD', channel = 'MTN_MOMO', referencePhoneOrAccount } = req.body;

  if (!amount || amount <= 0) {
    res.status(400).json({ error: 'Invalid deposit amount' });
    return;
  }

  const result = walletService.deposit(walletId, {
    walletId,
    amount: Number(amount),
    currency,
    channel,
    referencePhoneOrAccount
  });

  res.json({
    message: 'Deposit processed successfully and recorded in double-entry ledger',
    result
  });
});

// 3. POST /api/v1/wallet/withdraw
organ3Router.post('/wallet/withdraw', (req: Request, res: Response): void => {
  const { walletId = 'WAL-MEHERAH-001', amount, currency = 'USD', destinationChannel = 'MTN_MOMO', destinationAccount } = req.body;

  if (!amount || amount <= 0 || !destinationAccount) {
    res.status(400).json({ error: 'Invalid withdrawal parameters' });
    return;
  }

  const result = walletService.withdraw(walletId, {
    walletId,
    amount: Number(amount),
    currency,
    destinationChannel,
    destinationAccount
  });

  res.json({
    message: result.status === 'COMPLETED' ? 'Withdrawal completed' : 'Withdrawal rejected',
    result
  });
});

// 4. POST /api/v1/wallet/transfer
organ3Router.post('/wallet/transfer', (req: Request, res: Response): void => {
  const { senderWalletId = 'WAL-MEHERAH-001', recipientAccountNumberOrEmail, amount, currency = 'USD', note } = req.body;

  if (!amount || amount <= 0 || !recipientAccountNumberOrEmail) {
    res.status(400).json({ error: 'Invalid transfer parameters' });
    return;
  }

  const result = walletService.transfer({
    senderWalletId,
    recipientAccountNumberOrEmail,
    amount: Number(amount),
    currency,
    note
  });

  res.json({
    message: result.status === 'COMPLETED' ? 'P2P Transfer completed' : 'Transfer failed',
    result
  });
});

// 5. GET /api/v1/savings/options
organ3Router.get('/savings/options', (req: Request, res: Response): void => {
  const amount = Number(req.query.amount) || 1000;
  const currency = (req.query.currency as string) || 'USD';

  const options = savingsEngine.getAvailableOptions(amount, currency);
  const userAllocations = savingsEngine.getUserAllocations('usr_demo_001');

  res.json({
    status: 'success',
    amount,
    currency,
    options,
    userAllocations
  });
});

// 6. POST /api/v1/savings/allocate
organ3Router.post('/savings/allocate', (req: Request, res: Response): void => {
  const { userId = 'usr_demo_001', productId, amount = 1000, currency = 'USD' } = req.body;

  const allocation = savingsEngine.proposeSavingsAllocation(userId, productId, Number(amount), currency);

  res.json({
    message: 'Savings allocation proposed and awaiting user approval',
    allocation
  });
});

// 7. POST /api/v1/savings/approve
organ3Router.post('/savings/approve', (req: Request, res: Response): void => {
  const { allocationId } = req.body;

  const allocation = savingsEngine.approveSavingsAllocation(allocationId);

  if (!allocation) {
    res.status(404).json({ error: 'Allocation not found' });
    return;
  }

  res.json({
    message: 'Savings allocation approved and activated',
    allocation
  });
});

// 8. GET /api/v1/loans/offers
organ3Router.get('/loans/offers', (req: Request, res: Response): void => {
  const userId = (req.query.userId as string) || 'usr_demo_001';
  const amount = Number(req.query.amount) || 5000;

  const data = loanEngine.getLoanOffers(userId, amount);

  res.json({
    status: 'success',
    creditAssessment: data.assessment,
    loanOffers: data.offers
  });
});

// 9. GET /api/v1/financial-health
organ3Router.get('/financial-health', (req: Request, res: Response): void => {
  const userId = (req.query.userId as string) || 'usr_demo_001';

  const overview = financialCoach.getFinancialHealthOverview(userId);

  res.json({
    status: 'success',
    overview
  });
});

// 10. POST /api/v1/treasury/rebalance
organ3Router.post('/treasury/rebalance', (req: Request, res: Response): void => {
  const { sourceId, sourceName, targetId, targetName, amount, currency = 'USD' } = req.body;

  if (!sourceId || !targetId || !amount) {
    res.status(400).json({ error: 'Missing rebalancing parameters' });
    return;
  }

  const instruction = treasuryEngine.triggerRebalance(sourceId, sourceName || sourceId, targetId, targetName || targetId, Number(amount));

  res.json({
    message: 'Treasury rebalancing instruction generated',
    instruction
  });
});

// 11. GET /api/v1/treasury/liquidity
organ3Router.get('/treasury/liquidity', (req: Request, res: Response): void => {
  const liquidity = treasuryEngine.getLiquidityOverview();
  const efficiency = treasuryEngine.getEfficiencyScores();

  res.json({
    status: 'success',
    liquidity,
    efficiencyScores: efficiency
  });
});

// 12. GET /api/v1/treasury/predictions
organ3Router.get('/treasury/predictions', (req: Request, res: Response): void => {
  const liquidity = treasuryEngine.getLiquidityOverview();

  res.json({
    status: 'success',
    predictions: liquidity.predictions,
    criticalAlertsCount: liquidity.criticalShortageAlertsCount
  });
});
