/**
 * MEHERAH Lifecycle - Deployment Controller
 * Coordinates the full MCOA Component Control Plane deployment pipeline:
 * Shadow Traffic Engine -> Canary Manager -> Rollback Engine / Version Manager Promotion.
 */

import { ComponentRegistry } from '../registry/component-registry';
import { VersionManager } from '../registry/version-manager';
import { ShadowTrafficEngine, ShadowEvaluationResult } from '../twin/shadow-traffic-engine';
import { CanaryManager, CanaryDeploymentProgress } from './canary-manager';
import { RollbackEngine, RollbackEvent } from './rollback-engine';

export interface DeploymentPipelineResult {
  pipelineId: string;
  componentId: string;
  targetVersion: string;
  shadowEvaluation: ShadowEvaluationResult;
  canaryProgress: CanaryDeploymentProgress;
  rollbackEvent?: RollbackEvent;
  finalStatus: 'SUCCESSFULLY_PROMOTED' | 'ROLLED_BACK_REGRESSION' | 'PENDING';
}

export class DeploymentController {
  private registry: ComponentRegistry;
  private versionManager: VersionManager;
  private shadowEngine: ShadowTrafficEngine;
  private canaryManager: CanaryManager;
  private rollbackEngine: RollbackEngine;

  constructor(registry: ComponentRegistry, versionManager: VersionManager) {
    this.registry = registry;
    this.versionManager = versionManager;
    this.shadowEngine = new ShadowTrafficEngine();
    this.canaryManager = new CanaryManager();
    this.rollbackEngine = new RollbackEngine();
  }

  public executeFullPipeline(componentId: string, candidateVersion: string): DeploymentPipelineResult {
    const pipelineId = `PIPE-${componentId}-${Date.now()}`;
    const comp = this.registry.getComponent(componentId);
    const currentVersion = comp ? comp.version : '1.0.0';

    // Step 1: Digital Twin Shadow Traffic Evaluation
    const shadowEval = this.shadowEngine.evaluateCandidateComponent({
      componentId,
      currentVersion,
      candidateVersion,
      sampleTransactionCount: 10000,
    });

    if (shadowEval.comparison.regressionDetected) {
      const rollback = this.rollbackEngine.triggerAutoRollback(
        componentId,
        candidateVersion,
        'Digital Twin Shadow Traffic detected performance regression.'
      );
      return {
        pipelineId,
        componentId,
        targetVersion: candidateVersion,
        shadowEvaluation: shadowEval,
        canaryProgress: {
          componentId,
          version: candidateVersion,
          currentTrafficPct: 0,
          stagesCompleted: [],
          isFullyPromoted: false,
          hasRolledBack: true,
        },
        rollbackEvent: rollback,
        finalStatus: 'ROLLED_BACK_REGRESSION',
      };
    }

    // Step 2: Propose Upgrade in MCCP Version Manager
    const proposal = this.versionManager.proposeUpgrade(componentId, candidateVersion, true);

    // Step 3: Canary Deployment Ramp-up
    let canary = this.canaryManager.startCanaryDeployment(componentId, candidateVersion);
    canary = this.canaryManager.advanceCanary(componentId, true); // 10%
    canary = this.canaryManager.advanceCanary(componentId, true); // 50%
    canary = this.canaryManager.advanceCanary(componentId, true); // 100%

    // Step 4: Promote to Production in Registry
    this.versionManager.promoteToProduction(proposal.proposalId);

    return {
      pipelineId,
      componentId,
      targetVersion: candidateVersion,
      shadowEvaluation: shadowEval,
      canaryProgress: canary,
      finalStatus: 'SUCCESSFULLY_PROMOTED',
    };
  }

  public getShadowEngine(): ShadowTrafficEngine {
    return this.shadowEngine;
  }

  public getCanaryManager(): CanaryManager {
    return this.canaryManager;
  }

  public getRollbackEngine(): RollbackEngine {
    return this.rollbackEngine;
  }
}
