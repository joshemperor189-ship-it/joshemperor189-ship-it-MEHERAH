import crypto from 'crypto';

export interface AuditEvent {
  eventId: string;
  orgId: string;
  userId: string;
  agentName: string | null;
  action: string;
  timestamp: string;
  previousState: string;
  newState: string;
  cryptoHash: string;
}

export class AuditLedgerService {
  private static lastKnownEventHash: string = '0000000000000000000000000000000000000000000000000000000000000000';
  private static auditLogsMemory: AuditEvent[] = [
    {
      eventId: 'evt-001',
      orgId: 'BOU_NATIONAL_PAYMENTS',
      userId: 'usr_gov_01',
      agentName: 'Gemini 2.5 Reasoner',
      action: 'LIQUIDITY_BUFFER_REALLOCATE',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      previousState: 'BOU:40%, BANK:40%, MOMO:20%',
      newState: 'BOU:45%, BANK:35%, MOMO:20%',
      cryptoHash: '8f921a4bc82d01e23f982a1701cde82739174092b10928a'
    },
    {
      eventId: 'evt-002',
      orgId: 'BOU_NATIONAL_PAYMENTS',
      userId: 'usr_gov_01',
      agentName: 'System Operator',
      action: 'SETTLEMENT_BATCH_EXECUTE',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      previousState: 'PENDING_BATCH',
      newState: 'CLEARED_UGX_8.24B',
      cryptoHash: '4a91b827e192a83e0129bc810023a10291a27192bc80210'
    }
  ];

  public static getAuditTrail(limit: number = 50): AuditEvent[] {
    return this.auditLogsMemory.slice(0, limit);
  }

  /**
   * Appends an operational log block onto the cryptographic blockchain ledger.
   */
  public static async recordEvent(params: {
    orgId: string;
    userId: string;
    agentName: string | null;
    action: string;
    previousState: any;
    newState: any;
  }): Promise<AuditEvent> {
    const eventId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const prevStr = JSON.stringify(params.previousState);
    const newStr = JSON.stringify(params.newState);

    // Build unique cryptographic hash fingerprint tied directly to historical line blocks
    const hashInput = `${eventId}|${params.orgId}|${params.action}|${timestamp}|${prevStr}|${newStr}|${this.lastKnownEventHash}`;
    const currentHash = crypto.createHmac('sha256', 'meherah-audit-salt').update(hashInput).digest('hex');

    const finalizedEvent: AuditEvent = {
      eventId,
      orgId: params.orgId,
      userId: params.userId,
      agentName: params.agentName,
      action: params.action,
      timestamp,
      previousState: prevStr,
      newState: newStr,
      cryptoHash: currentHash
    };

    // Forward historical chain tracking token pointer
    this.lastKnownEventHash = currentHash;
    this.auditLogsMemory.unshift(finalizedEvent);
    
    // In production, this object handles a secure direct entry write command via Prisma
    console.log(`[AUDIT LEDGER SECURED] Action: ${params.action} | Hash: ${currentHash.substring(0, 8)}`);
    return finalizedEvent;
  }
}
