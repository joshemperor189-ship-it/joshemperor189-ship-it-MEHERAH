import crypto from 'crypto';

export class VaultService {
  private static ALGORITHM = 'aes-256-gcm';
  // Fallback hardware salt for local dev; loaded via process.env in cloud target spaces
  private static ENCRYPTION_KEY = Buffer.from(process.env.VAULT_MASTER_SECRET || 'd37506f0a500e6e1d6706b60a39e93bc', 'hex');
  private static IV_LENGTH = 12;

  /**
   * Encrypts a raw system credentials key payload into a secured hexagonal block string.
   */
  public static encryptSecret(plainTextSecret: string): { encryptedData: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv) as crypto.CipherGCM;
    
    let encrypted = cipher.update(plainTextSecret, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      tag: tag
    };
  }

  /**
   * Decrypts a vault string asset back into memory space for runtime processing.
   */
  public static decryptSecret(encryptedData: string, ivHex: string, tagHex: string): string {
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv) as crypto.DecipherGCM;
    
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    
    return decrypted;
  }

  /**
   * Sanitizes diagnostic text logs to prevent access credential leaks.
   */
  public static maskSecret(rawInput: string): string {
    if (!rawInput) return '';
    if (rawInput.startsWith('sk-') || rawInput.startsWith('AIza')) {
      return `${rawInput.substring(0, 7)}••••••••••••••••${rawInput.substring(rawInput.length - 4)}`;
    }
    return '••••••••••••••••';
  }
}
