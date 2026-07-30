export class PrivacyScrubber {
  private static EAST_AFRICA_REGEX = {
    // Captures Ugandan National Identification Numbers (NIN)
    UGANDA_NIN: /\b[CMF][M|F][0-9A-Z]{11}\b/gi,
    // Captures East African mobile money telephone number formats (+256, +254, +255, 07...)
    EA_PHONE: /(\+256|\+254|\+255|0)[7-9][0-9]{8}\b/g,
    // Detects localized raw environment secrets or hidden private wallet API keys
    GENERIC_SECRET: /(SECRET_|KEY_|TOKEN_)[A-Za-z0-9]{16,64}/g
  };

  // Matches Ugandan NINs: 14 characters starting with CM or CF followed by alphanumeric sequences
  private static UG_NIN_REGEX = /\bC[MF][0-9A-HJKMNPR-TV-Z]{12}\b/gi;

  // Matches Ugandan phone numbers: MSISDN formats (+256..., 256..., 07..., 01...)
  private static UG_PHONE_REGEX = /(?:\+?256|0)(?:7[0-8]\d|79\d|10\d)\d{6}\b/g;

  public static scrub(rawPayload: string): string {
    if (!rawPayload) return '';
    let cleanPayload = rawPayload;

    // Apply regex masks sequentially across systemic string inputs
    cleanPayload = cleanPayload.replace(this.EAST_AFRICA_REGEX.UGANDA_NIN, '[MASKED_NATIONAL_ID]');
    cleanPayload = cleanPayload.replace(this.EAST_AFRICA_REGEX.EA_PHONE, '[MASKED_PHONE_NUMBER]');
    cleanPayload = cleanPayload.replace(this.EAST_AFRICA_REGEX.GENERIC_SECRET, '[MASKED_SYSTEM_CREDENTIAL]');

    return cleanPayload;
  }

  /**
   * Scans and strips sensitive PII from incoming prompt strings
   */
  public static scrubPrompt(rawPrompt: string): string {
    if (!rawPrompt) return '';

    let scrubbed = rawPrompt;

    // 1. Mask Ugandan National ID Numbers (NINs)
    scrubbed = scrubbed.replace(this.UG_NIN_REGEX, (match) => {
      const checksum = match.substring(match.length - 3);
      return `[MASKED_UG_NIN_X${checksum}]`;
    });

    // 2. Mask Ugandan Mobile Phone / Mobile Money Configurations
    scrubbed = scrubbed.replace(this.UG_PHONE_REGEX, (match) => {
      const cleanNum = match.replace(/\D/g, '');
      const networkPrefix = cleanNum.startsWith('256') ? cleanNum.substring(3, 5) : cleanNum.substring(1, 3);
      return `[MASKED_UG_PHONE_0${networkPrefix}XXXXXX]`;
    });

    return scrubbed;
  }
}

