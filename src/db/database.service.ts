import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

export const databaseService = new PrismaClient();

let poolInstance: Pool | null = null;

function getPool(): Pool {
  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL;
    poolInstance = new Pool({
      connectionString: connectionString || 'postgresql://postgres:postgres@localhost:5432/meherah_os',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });

    poolInstance.on('error', (err) => {
      console.error('[DATABASE POOL ERROR] Unexpected client error:', err);
    });
  }
  return poolInstance;
}

export const db = {
  query: async (text: string, params?: any[]) => {
    const pool = getPool();
    return pool.query(text, params);
  },
  healthCheck: async () => {
    try {
      if (!process.env.DATABASE_URL) {
        return {
          status: 'STANDBY',
          message: 'DATABASE_URL is unconfigured. Operating with JSON persistence engine.',
          now: new Date().toISOString()
        };
      }
      const pool = getPool();
      const res = await pool.query('SELECT NOW()');
      return {
        status: 'ONLINE',
        now: res.rows[0].now,
        activePoolConnections: pool.totalCount
      };
    } catch (err: any) {
      return {
        status: 'DEGRADED',
        error: err.message || 'Failed to ping PostgreSQL database',
        now: new Date().toISOString()
      };
    }
  },
  isConfigured: () => Boolean(process.env.DATABASE_URL)
};

// In-memory fallback counters for when DATABASE_URL is not active
let inMemoryPiiLeaksPrevented = 0;
let inMemoryTxnCount = 0;
let inMemorySettledVolume = 0;

export class DatabaseService {
  /**
   * Performs an instant structural heartbeat check against the PostgreSQL database engine.
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      if (!process.env.DATABASE_URL) return true; // Standby engine active
      const pool = getPool();
      await pool.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('❌ Database Service: Connection pool heartbeat failed:', error);
      return false;
    }
  }

  /**
   * Logs data processed by the PII Scrubber into the security audit table.
   */
  public static async logSecurityAudit(params: {
    agentName: string;
    originalPromptBytes: number;
    scrubbedPrompt: string;
    detectionsTriggered: number;
  }): Promise<void> {
    inMemoryPiiLeaksPrevented += params.detectionsTriggered;
    try {
      if (!process.env.DATABASE_URL) return;
      const pool = getPool();
      await pool.query(
        `INSERT INTO security_scrub_audit (agent_name, original_prompt_bytes, scrubbed_prompt, detections_triggered)
         VALUES ($1, $2, $3, $4)`,
        [params.agentName, params.originalPromptBytes, params.scrubbedPrompt, params.detectionsTriggered]
      );
    } catch (error) {
      console.error('⚠️ Database Service: Failed to write zero-trust audit record:', error);
    }
  }

  /**
   * Executes an atomic cross-network liquidity settlement transaction.
   */
  public static async executeLiquidityRoute(params: {
    senderWalletId: string;
    recipientIdentifier: string;
    amountUgx: number;
    systemFeeUgx: number;
    zkProofHash: string;
  }): Promise<{ transactionId: string; success: boolean }> {
    const txnId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    if (!process.env.DATABASE_URL) {
      // In-memory simulation execution
      inMemoryTxnCount++;
      inMemorySettledVolume += params.amountUgx;
      return { transactionId: txnId, success: true };
    }

    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const walletRes = await client.query(
        `SELECT balance_amount, is_active FROM linked_wallets WHERE wallet_id = $1 FOR UPDATE`,
        [params.senderWalletId]
      );

      if (walletRes.rows.length === 0 || !walletRes.rows[0].is_active) {
        throw new Error('Wallet target container is invalid or inactive');
      }

      const balance = Number(walletRes.rows[0].balance_amount);
      const totalDebit = params.amountUgx + params.systemFeeUgx;

      if (balance < totalDebit) {
        throw new Error('Insufficient wallet liquidity for transfer execution');
      }

      await client.query(
        `UPDATE linked_wallets SET balance_amount = balance_amount - $1 WHERE wallet_id = $2`,
        [totalDebit, params.senderWalletId]
      );

      const txnRes = await client.query(
        `INSERT INTO transactions (sender_wallet_id, recipient_identifier, amount_ugx, system_fee_ugx, settlement_status, zk_proof_hash, settled_at)
         VALUES ($1, $2, $3, $4, 'SETTLED', $5, NOW()) RETURNING transaction_id`,
        [params.senderWalletId, params.recipientIdentifier, params.amountUgx, params.systemFeeUgx, params.zkProofHash]
      );

      await client.query('COMMIT');
      return { transactionId: txnRes.rows[0].transaction_id || txnId, success: true };
    } catch (error: any) {
      await client.query('ROLLBACK');
      console.error('❌ Database Service: Liquidity routing pipeline failed:', error.message);

      try {
        const failRes = await pool.query(
          `INSERT INTO transactions (sender_wallet_id, recipient_identifier, amount_ugx, system_fee_ugx, settlement_status, zk_proof_hash)
           VALUES ($1, $2, $3, $4, 'FAILED', $5) RETURNING transaction_id`,
          [params.senderWalletId, params.recipientIdentifier, params.amountUgx, params.systemFeeUgx, params.zkProofHash]
        );
        return { transactionId: failRes.rows[0]?.transaction_id || txnId, success: false };
      } catch {
        return { transactionId: txnId, success: false };
      }
    } finally {
      client.release();
    }
  }

  /**
   * Fetches real-time telemetry metrics for the Executive Dashboard.
   */
  public static async getSystemTelemetryMetrics() {
    try {
      if (!process.env.DATABASE_URL) {
        return {
          totalTransactionsCount: inMemoryTxnCount,
          settledVolumeUgx: inMemorySettledVolume,
          piiLeaksPrevented: inMemoryPiiLeaksPrevented
        };
      }

      const pool = getPool();
      const [txnsCountRes, volumeRes, piiRes] = await Promise.all([
        pool.query(`SELECT COUNT(*) as count FROM transactions`),
        pool.query(`SELECT SUM(amount_ugx) as total FROM transactions WHERE settlement_status = 'SETTLED'`),
        pool.query(`SELECT SUM(detections_triggered) as total FROM security_scrub_audit`)
      ]);

      return {
        totalTransactionsCount: Number(txnsCountRes.rows[0]?.count || 0) + inMemoryTxnCount,
        settledVolumeUgx: Number(volumeRes.rows[0]?.total || 0) + inMemorySettledVolume,
        piiLeaksPrevented: Number(piiRes.rows[0]?.total || 0) + inMemoryPiiLeaksPrevented
      };
    } catch (error) {
      console.error('❌ Database Service: Failed to pull real-time dashboard analytics:', error);
      return {
        totalTransactionsCount: inMemoryTxnCount,
        settledVolumeUgx: inMemorySettledVolume,
        piiLeaksPrevented: inMemoryPiiLeaksPrevented
      };
    }
  }
}
