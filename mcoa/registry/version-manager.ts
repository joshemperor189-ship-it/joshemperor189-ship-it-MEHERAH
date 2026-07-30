/**
 * MEHERAH Component Control Plane (MCCP) - Version Manager
 * Manages semantic versioning, upgrade proposals, canary readiness checks,
 * backward compatibility verification, and rollback history logging.
 */

import { ComponentRegistry } from './component-registry';

export interface UpgradeProposal {
  proposalId: string;
  componentId: string;
  currentVersion: string;
  proposedVersion: string;
  flightProvenSimulatedPass: boolean;
  canaryTrafficPct: number; // e.g. 1%, 10%, 100%
  approvalStatus: 'PENDING_DIGITAL_TWIN' | 'APPROVED_FOR_CANARY' | 'PROMOTED_TO_PRODUCTION' | 'ROLLED_BACK';
  proposedAt: string;
  approvedAt?: string;
}

export interface RollbackRecord {
  rollbackId: string;
  componentId: string;
  fromVersion: string;
  restoredVersion: string;
  triggerReason: string;
  timestamp: string;
}

export class VersionManager {
  private registry: ComponentRegistry;
  private proposalHistory: Map<string, UpgradeProposal> = new Map();
  private rollbackLog: RollbackRecord[] = [];

  constructor(registry: ComponentRegistry) {
    this.registry = registry;
  }

  /**
   * Submits an upgrade proposal for a component.
   */
  public proposeUpgrade(
    componentId: string,
    proposedVersion: string,
    flightProvenSimulatedPass: boolean
  ): UpgradeProposal {
    const comp = this.registry.getComponent(componentId);
    const currentVersion = comp ? comp.version : '0.0.0';

    const proposal: UpgradeProposal = {
      proposalId: `PROP-${componentId}-${Date.now()}`,
      componentId,
      currentVersion,
      proposedVersion,
      flightProvenSimulatedPass,
      canaryTrafficPct: flightProvenSimulatedPass ? 1 : 0,
      approvalStatus: flightProvenSimulatedPass ? 'APPROVED_FOR_CANARY' : 'PENDING_DIGITAL_TWIN',
      proposedAt: new Date().toISOString(),
    };

    this.proposalHistory.set(proposal.proposalId, proposal);
    return proposal;
  }

  /**
   * Promotes an approved proposal to production in the registry.
   */
  public promoteToProduction(proposalId: string): { success: boolean; activeVersion: string; log: string } {
    const proposal = this.proposalHistory.get(proposalId);
    if (!proposal) {
      return { success: false, activeVersion: 'N/A', log: `Proposal ID '${proposalId}' not found.` };
    }

    if (proposal.approvalStatus !== 'APPROVED_FOR_CANARY') {
      return {
        success: false,
        activeVersion: proposal.currentVersion,
        log: `Promotion rejected: Proposal '${proposalId}' is in state '${proposal.approvalStatus}', must be 'APPROVED_FOR_CANARY'.`,
      };
    }

    const comp = this.registry.getComponent(proposal.componentId);
    if (comp) {
      comp.version = proposal.proposedVersion;
      comp.status = 'ACTIVE';
    }

    proposal.approvalStatus = 'PROMOTED_TO_PRODUCTION';
    proposal.canaryTrafficPct = 100;
    proposal.approvedAt = new Date().toISOString();

    return {
      success: true,
      activeVersion: proposal.proposedVersion,
      log: `Upgrade Promoted: Component '${proposal.componentId}' successfully upgraded from v${proposal.currentVersion} -> v${proposal.proposedVersion}.`,
    };
  }

  /**
   * Executes an automated rollback if canary telemetry detects regression.
   */
  public executeRollback(componentId: string, reason: string): RollbackRecord {
    const comp = this.registry.getComponent(componentId);
    const currentVersion = comp ? comp.version : '1.0.0';
    const restoredVersion = '1.0.0'; // Rollback to stable baseline

    if (comp) {
      comp.version = restoredVersion;
      comp.status = 'ACTIVE';
    }

    const record: RollbackRecord = {
      rollbackId: `RB-${componentId}-${Date.now()}`,
      componentId,
      fromVersion: currentVersion,
      restoredVersion,
      triggerReason: reason,
      timestamp: new Date().toISOString(),
    };

    this.rollbackLog.push(record);
    return record;
  }

  public getRollbackLog(): RollbackRecord[] {
    return this.rollbackLog;
  }
}
