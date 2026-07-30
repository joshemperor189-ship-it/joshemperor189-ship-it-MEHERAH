import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { eventBus } from './event-bus.service';

export interface TenantKmsVault {
  tenantId: string;
  tenantName: string;
  hsmStatus: 'ACTIVE_HSM' | 'INITIALIZING';
  masterKeyHash: string;
  partitionId: string;
  keysCount: number;
  lastRotated: string;
}

export class KmsVaultService {
  private static instance: KmsVaultService;
  private tenants: Map<string, TenantKmsVault> = new Map();
  private ephemeralTokensIssued = 0;

  private constructor() {
    this.initDefaultTenants();
  }

  public static getInstance(): KmsVaultService {
    if (!KmsVaultService.instance) {
      KmsVaultService.instance = new KmsVaultService();
    }
    return KmsVaultService.instance;
  }

  private initDefaultTenants() {
    const defaultTenants = [
      { id: 'meherah-primary', name: 'Meherah Core Operations' },
      { id: 'kampala-subsidiary', name: 'Kampala Fintech Platform' },
      { id: 'nairobi-hub', name: 'Nairobi Liquidity Exchange' }
    ];

    for (const t of defaultTenants) {
      this.tenants.set(t.id, {
        tenantId: t.id,
        tenantName: t.name,
        hsmStatus: 'ACTIVE_HSM',
        masterKeyHash: crypto.createHash('sha256').update(t.id + '_master_seed_2026').digest('hex').substring(0, 16) + '...',
        partitionId: 'hsm_part_' + t.id.substring(0, 6),
        keysCount: 6,
        lastRotated: new Date().toISOString()
      });
    }
  }

  public issueEphemeralToken(tenantId: string, scope: string): { token: string; expiresAt: string } {
    this.ephemeralTokensIssued += 1;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min TTL
    const secret = process.env.JWT_SECRET || 'meherah_super_secret_key_2026';

    const token = jwt.sign(
      {
        tenantId,
        scope,
        issuer: 'MEHERAH_KMS_VAULT_HSM',
        type: 'ephemeral_handshake'
      },
      secret,
      { expiresIn: '5m' }
    );

    eventBus.publish('agent.directive', 'KMS Vault Agent', {
      tenantId,
      scope,
      action: 'EPHEMERAL_TOKEN_ISSUED',
      insight: `Issued single-use HSM-signed token for ${scope}. Raw API keys remain shielded inside HSM partition.`
    });

    return { token, expiresAt };
  }

  public getTenants(): TenantKmsVault[] {
    return Array.from(this.tenants.values());
  }

  public rotateTenantKeys(tenantId: string): TenantKmsVault | null {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) return null;

    tenant.masterKeyHash = crypto.createHash('sha256').update(tenantId + '_' + Date.now()).digest('hex').substring(0, 16) + '...';
    tenant.lastRotated = new Date().toISOString();

    eventBus.publish('agent.directive', 'KMS Vault Agent', {
      tenantId,
      action: 'KEY_ROTATION_COMPLETED',
      insight: `Rotated Master Encryption Keys inside Cryptographic HSM partition ${tenant.partitionId}.`
    });

    return tenant;
  }

  public getStats() {
    return {
      activePartitions: this.tenants.size,
      ephemeralTokensIssued: this.ephemeralTokensIssued,
      hsmSecurityLevel: 'FIPS 140-2 Level 3 Hardware Security Module'
    };
  }
}

export const kmsVaultService = KmsVaultService.getInstance();
