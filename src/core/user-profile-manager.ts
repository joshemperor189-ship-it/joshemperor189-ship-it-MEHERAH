export type UserRole = 
  | 'FOUNDER'
  | 'BUSINESS_EXECUTIVE'
  | 'BANKING_PROFESSIONAL'
  | 'GOVERNMENT_ANALYST'
  | 'RESEARCHER'
  | 'DEVELOPER'
  | 'ENTERPRISE_ADMIN';

export interface UserProfileConfig {
  role: UserRole;
  title: string;
  description: string;
  defaultMode: 'SIMPLE' | 'PROFESSIONAL' | 'ENGINEERING';
  explanationStyle: 'CONCISE_BUSINESS' | 'EXECUTIVE_SUMMARY' | 'RISK_COMPLIANCE' | 'EMPIRICAL_ANALYTICAL' | 'TECHNICAL_DEEP_DIVE';
  preferredLayout: 'STRATEGY_FIRST' | 'METRICS_FIRST' | 'RISK_FIRST' | 'TELEMETRY_FIRST';
  recommendedMissions: string[];
}

export class UserProfileManager {
  private static profiles: Record<UserRole, UserProfileConfig> = {
    FOUNDER: {
      role: 'FOUNDER',
      title: 'Startup Founder & Entrepreneur',
      description: 'Focuses on agile growth opportunities, rapid market entry, and capital allocation.',
      defaultMode: 'SIMPLE',
      explanationStyle: 'CONCISE_BUSINESS',
      preferredLayout: 'STRATEGY_FIRST',
      recommendedMissions: [
        'Create a business expansion strategy',
        'Find new market opportunities',
        'Create investment proposal',
        'Analyse competitors'
      ]
    },
    BUSINESS_EXECUTIVE: {
      role: 'BUSINESS_EXECUTIVE',
      title: 'Corporate Executive & C-Suite',
      description: 'Prioritizes high-level strategy synthesis, operational roadmaps, and ROI metrics.',
      defaultMode: 'SIMPLE',
      explanationStyle: 'EXECUTIVE_SUMMARY',
      preferredLayout: 'STRATEGY_FIRST',
      recommendedMissions: [
        'Create a business expansion strategy',
        'Analyse cash flow',
        'Create financial forecast',
        'Review architecture'
      ]
    },
    BANKING_PROFESSIONAL: {
      role: 'BANKING_PROFESSIONAL',
      title: 'Banking & Financial Specialist',
      description: 'Focuses on financial risk analysis, regulatory compliance, and cross-border currency hedging.',
      defaultMode: 'PROFESSIONAL',
      explanationStyle: 'RISK_COMPLIANCE',
      preferredLayout: 'RISK_FIRST',
      recommendedMissions: [
        'Analyse cash flow',
        'Identify financial risks',
        'Create financial forecast',
        'Summarize economic trends'
      ]
    },
    GOVERNMENT_ANALYST: {
      role: 'GOVERNMENT_ANALYST',
      title: 'Public Sector & Economic Analyst',
      description: 'Evaluates trade accords, policy impacts, regional economics, and public governance.',
      defaultMode: 'PROFESSIONAL',
      explanationStyle: 'EMPIRICAL_ANALYTICAL',
      preferredLayout: 'METRICS_FIRST',
      recommendedMissions: [
        'Research an industry',
        'Analyse regional markets',
        'Summarize economic trends',
        'Identify financial risks'
      ]
    },
    RESEARCHER: {
      role: 'RESEARCHER',
      title: 'Academic & Strategy Researcher',
      description: 'Requires deep empirical evidence tracking, data sourcing, and literature synthesis.',
      defaultMode: 'PROFESSIONAL',
      explanationStyle: 'EMPIRICAL_ANALYTICAL',
      preferredLayout: 'METRICS_FIRST',
      recommendedMissions: [
        'Research an industry',
        'Analyse regional markets',
        'Analyse competitors',
        'Summarize economic trends'
      ]
    },
    DEVELOPER: {
      role: 'DEVELOPER',
      title: 'Software Engineer & Architect',
      description: 'Demands full visibility into API contracts, multi-agent telemetry, and system diagnostics.',
      defaultMode: 'ENGINEERING',
      explanationStyle: 'TECHNICAL_DEEP_DIVE',
      preferredLayout: 'TELEMETRY_FIRST',
      recommendedMissions: [
        'Design an application',
        'Review architecture',
        'Create development roadmap',
        'Find new market opportunities'
      ]
    },
    ENTERPRISE_ADMIN: {
      role: 'ENTERPRISE_ADMIN',
      title: 'Enterprise System Administrator',
      description: 'Oversees identity governance, audit logs, node security boundaries, and policy compliance.',
      defaultMode: 'ENGINEERING',
      explanationStyle: 'RISK_COMPLIANCE',
      preferredLayout: 'TELEMETRY_FIRST',
      recommendedMissions: [
        'Review architecture',
        'Identify financial risks',
        'Design an application',
        'Analyse cash flow'
      ]
    }
  };

  public static getProfile(role: UserRole): UserProfileConfig {
    return this.profiles[role] || this.profiles.FOUNDER;
  }

  public static getAllProfiles(): UserProfileConfig[] {
    return Object.values(this.profiles);
  }
}
