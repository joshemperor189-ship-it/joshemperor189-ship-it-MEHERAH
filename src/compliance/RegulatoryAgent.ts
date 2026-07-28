import { amlMonitor } from './AMLMonitor';
import { kycEngine } from './KYCEngine';
import { reportingEngine } from './ReportingEngine';

export class RegulatoryAgentService {
  private static instance: RegulatoryAgentService;

  private constructor() {}

  public static getInstance(): RegulatoryAgentService {
    if (!RegulatoryAgentService.instance) {
      RegulatoryAgentService.instance = new RegulatoryAgentService();
    }
    return RegulatoryAgentService.instance;
  }

  public getComplianceOverview() {
    return {
      agentStatus: 'ACTIVE_MONITORING',
      amlAlerts: amlMonitor.getAlerts(),
      regulatoryReports: reportingEngine.getReports(),
      regulatoryBodyConnections: [
        { name: 'Bank of Uganda (BOU) Regulatory Portal', status: 'ONLINE', latencyMs: 140 },
        { name: 'Financial Intelligence Authority (FIA) AML API', status: 'ONLINE', latencyMs: 110 }
      ]
    };
  }
}

export const regulatoryAgent = RegulatoryAgentService.getInstance();
