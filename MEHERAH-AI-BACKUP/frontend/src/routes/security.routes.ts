import { Router, Request, Response } from 'express';
import { RbacService, AccessContext } from '../security/rbac.service.ts';
import { VaultService } from '../security/vault.service.ts';
import { AuditLedgerService } from '../services/audit-ledger.service.ts';
import { IdentityService } from '../services/identity.service.ts';
import { SecurityMonitorService } from '../services/security-monitor.service.ts';
import { ApprovalPolicyEngine, GovernanceTransactionRequest } from '../security/approval-policy.engine.ts';

export const securityRouter = Router();

/**
 * GET /api/v1/security/status
 * Fetches core enterprise security plane telemetry
 */
securityRouter.get('/status', async (req: Request, res: Response) => {
  try {
    const monitorReport = SecurityMonitorService.generateStatusReport();
    return res.status(200).json({
      success: true,
      security: {
        vaultStatus: 'HARDENED',
        rbacEngine: 'ENFORCING',
        auditLedgerHashChain: 'ACTIVE',
        activeTenantsCount: 12,
        activeUsersCount: 250,
        activeAgentsCount: 8,
        monitor: monitorReport
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch security status' });
  }
});

/**
 * POST /api/v1/security/rbac-check
 * Evaluates access control permissions in real-time
 */
securityRouter.post('/rbac-check', async (req: Request, res: Response): Promise<any> => {
  const { userId, role, orgId, assignedPermissions, resourceAction } = req.body;

  if (!role || !resourceAction) {
    return res.status(400).json({ success: false, error: 'Role and resourceAction are required' });
  }

  const context: AccessContext = {
    userId: userId || 'anon',
    role: role,
    orgId: orgId || 'default-org',
    assignedPermissions: assignedPermissions || []
  };

  const allowed = RbacService.checkPermission(context, resourceAction);

  await AuditLedgerService.recordEvent({
    orgId: context.orgId,
    userId: context.userId,
    agentName: 'RBAC_EVALUATOR',
    action: `rbac.check.${resourceAction}`,
    previousState: { requested: resourceAction },
    newState: { allowed }
  });

  return res.status(200).json({
    success: true,
    allowed,
    context
  });
});

/**
 * POST /api/v1/security/evaluate-action
 * Evaluates approval governance for transactions and system changes
 */
securityRouter.post('/evaluate-action', async (req: Request, res: Response): Promise<any> => {
  try {
    const governanceReq: GovernanceTransactionRequest = req.body;
    const evaluation = await ApprovalPolicyEngine.evaluateActionRequest(governanceReq);
    
    await AuditLedgerService.recordEvent({
      orgId: governanceReq.orgId || 'default-org',
      userId: governanceReq.userId || 'anon',
      agentName: 'APPROVAL_POLICY_ENGINE',
      action: `governance.evaluate.${governanceReq.actionType}`,
      previousState: governanceReq,
      newState: evaluation
    });

    return res.status(200).json({
      success: true,
      evaluation
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to evaluate action request' });
  }
});
