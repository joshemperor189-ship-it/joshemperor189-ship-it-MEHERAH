export interface GovernanceRole {
  roleId: 'TREASURY_OFFICER' | 'COMPLIANCE_DIRECTOR' | 'RISK_AUDITOR' | 'MEHERAH_OPERATOR';
  title: string;
  assignedUser: string;
  permissions: string[];
}

export interface MultiSigApprovalRequest {
  requestId: string;
  title: string;
  amountUGX: number;
  requesterRole: string;
  requiredSignaturesCount: number;
  currentSignatures: { role: string; signedAt: string; comments: string }[];
  status: 'PENDING_DUAL_APPROVAL' | 'APPROVED_AND_EXECUTED' | 'REJECTED';
  createdAt: string;
}

export interface EmergencyKillswitchState {
  globalSystemPaused: boolean;
  pausedConnectors: string[];
  maxPerTransactionCapUGX: number;
  circuitBreakerAutoTripEnabled: boolean;
}

export class InstitutionalGovernanceService {
  private static instance: InstitutionalGovernanceService;

  private roles: GovernanceRole[] = [
    { roleId: 'TREASURY_OFFICER', title: 'Chief Treasury Officer', assignedUser: 'Kato Mark Mukasa', permissions: ['INITIATE_REBALANCE', 'SET_LIQUIDITY_LIMITS', 'APPROVE_TREASURY_SWEEPS'] },
    { roleId: 'COMPLIANCE_DIRECTOR', title: 'Director of Risk & Compliance', assignedUser: 'Dr. Sarah Nabatanzi', permissions: ['APPROVE_MULTISIG', 'OVERRIDE_AML_BLOCK', 'SUBMIT_SAR_REPORTS'] },
    { roleId: 'RISK_AUDITOR', title: 'Institutional Lead Auditor', assignedUser: 'PwC / Ernst & Young Audit Portal', permissions: ['VIEW_FULL_AUDIT_TRAIL', 'EXPORT_REGULATORY_PACKAGES'] },
    { roleId: 'MEHERAH_OPERATOR', title: 'System Chief Controller', assignedUser: 'Autonomous AI Kernel Operator', permissions: ['EXECUTE_AUTO_ROUTING', 'TRIP_CIRCUIT_BREAKER'] }
  ];

  private multiSigRequests: MultiSigApprovalRequest[] = [
    {
      requestId: 'MSIG-2026-8801',
      title: 'UGX 250,000,000 Inter-Bank Treasury Rebalance to Stanbic Reserve',
      amountUGX: 250000000,
      requesterRole: 'MEHERAH Autonomous Treasury Engine',
      requiredSignaturesCount: 2,
      currentSignatures: [
        { role: 'TREASURY_OFFICER', signedAt: new Date(Date.now() - 1800000).toISOString(), comments: 'Approved based on predicted MTN MoMo midday liquidity deficit.' }
      ],
      status: 'PENDING_DUAL_APPROVAL',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  private killswitchState: EmergencyKillswitchState = {
    globalSystemPaused: false,
    pausedConnectors: [],
    maxPerTransactionCapUGX: 500000000,
    circuitBreakerAutoTripEnabled: true
  };

  private constructor() {}

  public static getInstance(): InstitutionalGovernanceService {
    if (!InstitutionalGovernanceService.instance) {
      InstitutionalGovernanceService.instance = new InstitutionalGovernanceService();
    }
    return InstitutionalGovernanceService.instance;
  }

  public getGovernanceOverview() {
    return {
      roles: [...this.roles],
      multiSigRequests: [...this.multiSigRequests],
      killswitchState: { ...this.killswitchState }
    };
  }

  public approveMultiSigRequest(requestId: string, approverRole: string, comments: string) {
    const req = this.multiSigRequests.find(r => r.requestId === requestId);
    if (!req) throw new Error('Request not found');

    req.currentSignatures.push({
      role: approverRole,
      signedAt: new Date().toISOString(),
      comments
    });

    if (req.currentSignatures.length >= req.requiredSignaturesCount) {
      req.status = 'APPROVED_AND_EXECUTED';
    }

    return req;
  }

  public toggleConnectorKillswitch(connectorId: string) {
    const index = this.killswitchState.pausedConnectors.indexOf(connectorId);
    if (index > -1) {
      this.killswitchState.pausedConnectors.splice(index, 1);
    } else {
      this.killswitchState.pausedConnectors.push(connectorId);
    }
    return { ...this.killswitchState };
  }
}

export const institutionalGovernance = InstitutionalGovernanceService.getInstance();
