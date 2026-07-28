export interface SecurityStatusReport {
  firewallStatus: 'SHIELD_OPTIMAL' | 'THREAT_MITIGATED' | 'BREACH_LOCKDOWN';
  activeViolationsCounter: number;
  flaggedAnomalies: string[];
}

export class SecurityMonitorService {
  private static failedLoginsCounter = 0;
  private static anomaliesLogStore: string[] = [];

  public static trackFailedLoginAttempt(ipAddress: string): void {
    this.failedLoginsCounter++;
    if (this.failedLoginsCounter > 5) {
      this.anomaliesLogStore.push(`Suspicious connection access burst monitored from target interface IP: ${ipAddress}`);
    }
  }

  public static generateStatusReport(): SecurityStatusReport {
    return {
      firewallStatus: this.failedLoginsCounter > 10 ? 'THREAT_MITIGATED' : 'SHIELD_OPTIMAL',
      activeViolationsCounter: this.failedLoginsCounter,
      flaggedAnomalies: this.anomaliesLogStore
    };
  }
}
