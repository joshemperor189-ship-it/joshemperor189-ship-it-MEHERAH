export interface PilotUser {
  userId: string;
  name: string;
  role: 'MERCHANT_TESTER' | 'PAYROLL_PILOT' | 'REMITTANCE_AGENT';
  dailyVolumeLimitUGX: number;
  usedVolumeTodayUGX: number;
  status: 'ACTIVE_PILOT' | 'PAUSED';
}

export interface PilotMetrics {
  environmentStatus: 'CONTROLLED_PILOT_ACTIVE';
  totalPilotTransactions: number;
  successRatePct: number;
  averageFeePct: number;
  meanRecoveryTimeMs: number;
  aiDecisionAccuracyPct: number;
  falseFraudAlerts: number;
  auditLogEntriesCount: number;
}

export class PilotEnvironmentService {
  private static instance: PilotEnvironmentService;

  private pilotUsers: PilotUser[] = [
    { userId: 'usr_pilot_01', name: 'Kampala Coffee Roasters Ltd', role: 'MERCHANT_TESTER', dailyVolumeLimitUGX: 20000000, usedVolumeTodayUGX: 4500000, status: 'ACTIVE_PILOT' },
    { userId: 'usr_pilot_02', name: 'Mukasa Logistics & Supply', role: 'PAYROLL_PILOT', dailyVolumeLimitUGX: 50000000, usedVolumeTodayUGX: 18200000, status: 'ACTIVE_PILOT' },
    { userId: 'usr_pilot_03', name: 'Entebbe FinTech Kiosk', role: 'REMITTANCE_AGENT', dailyVolumeLimitUGX: 10000000, usedVolumeTodayUGX: 2100000, status: 'ACTIVE_PILOT' }
  ];

  private pilotMetrics: PilotMetrics = {
    environmentStatus: 'CONTROLLED_PILOT_ACTIVE',
    totalPilotTransactions: 3420,
    successRatePct: 99.85,
    averageFeePct: 0.82,
    meanRecoveryTimeMs: 420,
    aiDecisionAccuracyPct: 98.4,
    falseFraudAlerts: 0,
    auditLogEntriesCount: 6840
  };

  private constructor() {}

  public static getInstance(): PilotEnvironmentService {
    if (!PilotEnvironmentService.instance) {
      PilotEnvironmentService.instance = new PilotEnvironmentService();
    }
    return PilotEnvironmentService.instance;
  }

  public getPilotState(): { users: PilotUser[]; metrics: PilotMetrics } {
    return {
      users: [...this.pilotUsers],
      metrics: { ...this.pilotMetrics }
    };
  }
}

export const pilotEnvironmentService = PilotEnvironmentService.getInstance();
