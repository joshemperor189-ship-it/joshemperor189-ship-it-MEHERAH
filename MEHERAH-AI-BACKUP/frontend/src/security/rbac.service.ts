import { UserRole } from '../services/identity.service';

export interface AccessContext {
  userId: string;
  role: UserRole;
  orgId: string;
  assignedPermissions: string[];
}

export class RbacService {
  private static ROLE_PERMISSIONS_MATRIX: Record<UserRole, string[]> = {
    SUPER_ADMIN: ['*'], // Full global root bypass privileges
    SYSTEM_OPERATOR: ['system.status.view', 'ai.route.modify', 'agent.restart'],
    BANK_ADMIN: ['finance.route.calculate', 'finance.liquidity.view', 'approval.action.execute'],
    BUSINESS_OWNER: ['finance.route.calculate', 'project.create', 'billing.view'],
    ANALYST: ['finance.liquidity.view', 'research.execute', 'audit.view'],
    AI_AGENT: ['finance.route.calculate', 'research.execute', 'memory.persist']
  };

  /**
   * Evaluates if a specified context contains authorization rules to perform an action.
   */
  public static checkPermission(context: AccessContext, resourceAction: string): boolean {
    // 1. Root wildcard check for enterprise platform operators
    if (this.ROLE_PERMISSIONS_MATRIX[context.role]?.includes('*')) {
      return true;
    }

    // 2. Evaluate explicit standard role assignments
    const standardPermissions = this.ROLE_PERMISSIONS_MATRIX[context.role] || [];
    if (standardPermissions.includes(resourceAction)) {
      return true;
    }

    // 3. Fallback evaluation for runtime contextual custom permission extensions
    return context.assignedPermissions.includes(resourceAction);
  }
}
