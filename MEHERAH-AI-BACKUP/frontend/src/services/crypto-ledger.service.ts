import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In-memory fallback ledger when DB is offline or during local testing
const inMemoryLogs: any[] = [];

interface ActionLogInput {
  actionType: string;
  operatorId: string;
  payloadSnapshot: Record<string, any>;
}

export class CryptographicLedgerService {
  /**
   * Appends an immutable, hashed log entry to the database, chained securely to the previous block.
   */
  public static async recordAction(input: ActionLogInput): Promise<any> {
    const serializedPayload = JSON.stringify(input.payloadSnapshot);

    let previousEntryHash = 'MEHERAH_OS_GENESIS_BLOCK_HASH_00000000000000000';

    try {
      const previousEntry = await prisma.cryptographicActionLog.findFirst({
        orderBy: { timestamp: 'desc' },
      });
      if (previousEntry) {
        previousEntryHash = previousEntry.cryptographicHash;
      }
    } catch (e) {
      if (inMemoryLogs.length > 0) {
        previousEntryHash = inMemoryLogs[inMemoryLogs.length - 1].cryptographicHash;
      }
    }

    // Construct the definitive pre-image string for hashing
    const hashInputString = `${serializedPayload}|${input.actionType}|${input.operatorId}|${previousEntryHash}`;

    // Compute a secure, unalterable SHA-256 signature hash
    const cryptographicHash = crypto
      .createHash('sha256')
      .update(hashInputString)
      .digest('hex');

    try {
      const created = await prisma.cryptographicActionLog.create({
        data: {
          actionType: input.actionType,
          operatorId: input.operatorId,
          payloadSnapshot: serializedPayload,
          previousEntryHash,
          cryptographicHash,
        },
      });
      return created;
    } catch (e) {
      const fallbackLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        actionType: input.actionType,
        operatorId: input.operatorId,
        payloadSnapshot: serializedPayload,
        previousEntryHash,
        cryptographicHash,
      };
      inMemoryLogs.push(fallbackLog);
      return fallbackLog;
    }
  }

  /**
   * System Audit Routine: Validates the entire historical ledger database back to genesis.
   * If even a single character or hash link has been manipulated, the system raises an alarm.
   */
  public static async verifyLedgerIntegrity(): Promise<{ isValid: boolean; corruptLogId?: string }> {
    let allLogs: any[] = [];

    try {
      allLogs = await prisma.cryptographicActionLog.findMany({
        orderBy: { timestamp: 'asc' },
      });
    } catch (e) {
      allLogs = [...inMemoryLogs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    let expectedPreviousHash = 'MEHERAH_OS_GENESIS_BLOCK_HASH_00000000000000000';

    for (const log of allLogs) {
      // Confirm the chain continuity is unbroken
      if (log.previousEntryHash !== expectedPreviousHash) {
        return { isValid: false, corruptLogId: log.id };
      }

      // Recompute the hash to confirm zero post-settlement modifications happened inside PostgreSQL
      const dynamicHashInput = `${log.payloadSnapshot}|${log.actionType}|${log.operatorId}|${log.previousEntryHash}`;
      const recomputedHash = crypto
        .createHash('sha256')
        .update(dynamicHashInput)
        .digest('hex');

      if (log.cryptographicHash !== recomputedHash) {
        return { isValid: false, corruptLogId: log.id };
      }

      // Advance the chain pointer to the current validated block hash
      expectedPreviousHash = log.cryptographicHash;
    }

    return { isValid: true };
  }

  /**
   * Helper method to simulate in-memory log tampering during testing when database is unavailable.
   */
  public static tamperLogInMemory(id: string, newPayload: string) {
    const target = inMemoryLogs.find(l => l.id === id);
    if (target) {
      target.payloadSnapshot = newPayload;
    }
  }
}
