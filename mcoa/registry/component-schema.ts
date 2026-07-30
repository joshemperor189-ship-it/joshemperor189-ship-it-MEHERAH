/**
 * MEHERAH Component Control Plane (MCCP) - Component Schema & Types
 * Defines strict contracts for registered MEHERAH components, dependencies,
 * health classifications, and security clearances.
 */

export type ComponentType = 
  | 'AI_ROUTING'
  | 'AI_FUSION'
  | 'LEDGER_SETTLEMENT'
  | 'GOVERNANCE_POLICY'
  | 'SECURITY_HSM'
  | 'OBSERVABILITY'
  | 'PROVIDER_ADAPTER';

export type HealthState = 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE' | 'OFFLINE';

export type SecurityLevel = 'HSM_VERIFIED' | 'ZERO_TRUST_ENFORCED' | 'STANDARD_ISOLATED';

export interface ComponentDependency {
  dependencyId: string; // e.g. "NeuralMemory", "HSMGateway"
  requiredMinVersion: string;
  isCritical: boolean; // if true, failure of dependency degrades or freezes component
}

export interface ComponentMetadata {
  componentId: string; // e.g. "MAFE", "MFE", "FIG", "HSM_GATEWAY"
  componentName: string;
  componentType: ComponentType;
  version: string; // e.g. "1.0.0"
  status: 'ACTIVE' | 'HOT_SWAPPING' | 'DEPRECATED' | 'DISABLED';
  health: HealthState;
  securityLevel: SecurityLevel;
  dependencies: ComponentDependency[];
  regionCode: 'UG' | 'KE' | 'TZ' | 'NG' | 'GLOBAL';
  registeredAt: string;
  lastHealthCheckTimestamp: string;
}
