import crypto from 'crypto';

export type UserRole = 'SUPER_ADMIN' | 'SYSTEM_OPERATOR' | 'BANK_ADMIN' | 'BUSINESS_OWNER' | 'ANALYST' | 'AI_AGENT';

export interface EnterpriseUser {
  id: string;
  orgId: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  permissions: string[];
}

export class IdentityService {
  private static usersMockStore: Map<string, EnterpriseUser> = new Map();

  public static async createUser(params: {
    orgId: string;
    email: string;
    role: UserRole;
    permissions: string[];
  }): Promise<EnterpriseUser> {
    const userId = crypto.randomUUID();
    const tempPasswordHash = crypto.createHash('sha256').update(crypto.randomBytes(16)).digest('hex');
    
    const newUser: EnterpriseUser = {
      id: userId,
      orgId: params.orgId,
      email: params.email,
      passwordHash: tempPasswordHash,
      role: params.role,
      isActive: true,
      permissions: params.permissions,
    };

    this.usersMockStore.set(userId, newUser);
    return newUser;
  }

  public static async authenticateUser(email: string, passwordPlain: string): Promise<EnterpriseUser | null> {
    // Production targets look up rows inside PostgreSQL via Prisma
    const matched = Array.from(this.usersMockStore.values()).find(u => u.email === email);
    if (!matched || !matched.isActive) return null;
    return matched;
  }

  public static async assignRole(userId: string, newRole: UserRole, customPermissions?: string[]): Promise<boolean> {
    const user = this.usersMockStore.get(userId);
    if (!user) return false;
    
    user.role = newRole;
    if (customPermissions) {
      user.permissions = customPermissions;
    }
    return true;
  }

  public static async revokeAccess(userId: string): Promise<boolean> {
    const user = this.usersMockStore.get(userId);
    if (!user) return false;
    user.isActive = false;
    return true;
  }
}
