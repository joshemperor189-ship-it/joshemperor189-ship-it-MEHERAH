/**
 * MEHERAH Component Control Plane (MCCP) - Component Registry
 * Acts as the authoritative source of truth for all running MEHERAH components,
 * tracking dependencies, health states, and validating dependency graph integrity.
 */

import { ComponentMetadata, HealthState } from './component-schema';

export interface ComponentRegistrationResult {
  success: boolean;
  componentId: string;
  version: string;
  message: string;
  dependencyStatus: 'ALL_DEPENDENCIES_SATISFIED' | 'MISSING_CRITICAL_DEPENDENCY' | 'CYCLE_DETECTED';
}

export class ComponentRegistry {
  private registry: Map<string, ComponentMetadata> = new Map();

  constructor() {
    this.seedDefaultCoreComponents();
  }

  private seedDefaultCoreComponents(): void {
    const coreComponents: ComponentMetadata[] = [
      {
        componentId: 'MAFE',
        componentName: 'MAFE Adaptive Feedback Engine',
        componentType: 'AI_ROUTING',
        version: '1.4.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'ZERO_TRUST_ENFORCED',
        dependencies: [
          { dependencyId: 'NeuralMemory', requiredMinVersion: '1.0.0', isCritical: true },
          { dependencyId: 'ProviderAdapters', requiredMinVersion: '1.0.0', isCritical: true },
          { dependencyId: 'Ledger', requiredMinVersion: '1.0.0', isCritical: true },
        ],
        regionCode: 'UG',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
      {
        componentId: 'MFE',
        componentName: 'Multimodal Fusion Engine',
        componentType: 'AI_FUSION',
        version: '1.1.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'ZERO_TRUST_ENFORCED',
        dependencies: [
          { dependencyId: 'FIG', requiredMinVersion: '1.0.0', isCritical: false },
        ],
        regionCode: 'UG',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
      {
        componentId: 'HSM_GATEWAY',
        componentName: 'Hardware Security Module Key Vault',
        componentType: 'SECURITY_HSM',
        version: '2.0.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'HSM_VERIFIED',
        dependencies: [],
        regionCode: 'GLOBAL',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
      {
        componentId: 'Ledger',
        componentName: 'National Settlement Ledger',
        componentType: 'LEDGER_SETTLEMENT',
        version: '1.0.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'HSM_VERIFIED',
        dependencies: [
          { dependencyId: 'HSM_GATEWAY', requiredMinVersion: '2.0.0', isCritical: true },
        ],
        regionCode: 'UG',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
      {
        componentId: 'NeuralMemory',
        componentName: 'Neural Operational Memory',
        componentType: 'AI_ROUTING',
        version: '1.0.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'STANDARD_ISOLATED',
        dependencies: [],
        regionCode: 'UG',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
      {
        componentId: 'ProviderAdapters',
        componentName: 'Mobile Money & Bank Provider Adapters',
        componentType: 'PROVIDER_ADAPTER',
        version: '1.0.0',
        status: 'ACTIVE',
        health: 'OPTIMAL',
        securityLevel: 'ZERO_TRUST_ENFORCED',
        dependencies: [],
        regionCode: 'UG',
        registeredAt: new Date().toISOString(),
        lastHealthCheckTimestamp: new Date().toISOString(),
      },
    ];

    for (const comp of coreComponents) {
      this.registry.set(comp.componentId, comp);
    }
  }

  public registerComponent(metadata: ComponentMetadata): ComponentRegistrationResult {
    // Validate missing critical dependencies
    for (const dep of metadata.dependencies) {
      if (dep.isCritical && !this.registry.has(dep.dependencyId)) {
        return {
          success: false,
          componentId: metadata.componentId,
          version: metadata.version,
          message: `Registration rejected: Required critical dependency '${dep.dependencyId}' is missing from the registry.`,
          dependencyStatus: 'MISSING_CRITICAL_DEPENDENCY',
        };
      }
    }

    this.registry.set(metadata.componentId, metadata);
    return {
      success: true,
      componentId: metadata.componentId,
      version: metadata.version,
      message: `Component '${metadata.componentName}' v${metadata.version} registered successfully in MCCP.`,
      dependencyStatus: 'ALL_DEPENDENCIES_SATISFIED',
    };
  }

  public getComponent(componentId: string): ComponentMetadata | undefined {
    return this.registry.get(componentId);
  }

  public getAllComponents(): ComponentMetadata[] {
    return Array.from(this.registry.values());
  }

  public updateHealthState(componentId: string, health: HealthState): boolean {
    const comp = this.registry.get(componentId);
    if (!comp) return false;
    comp.health = health;
    comp.lastHealthCheckTimestamp = new Date().toISOString();
    return true;
  }
}
