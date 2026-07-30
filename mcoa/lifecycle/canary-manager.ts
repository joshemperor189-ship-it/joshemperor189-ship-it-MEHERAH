/**
 * MEHERAH Lifecycle - Canary Manager
 * Controls progressive traffic shifting (1% -> 10% -> 50% -> 100%) during component upgrades,
 * conducting health checks at each step before advancing traffic allocation.
 */

export interface CanaryStage {
  stageName: string; // e.g., '1% Trial', '10% Fleet', '50% Balance', '100% Full Production'
  trafficPercentage: number; // 1, 10, 50, 100
  passedHealthCheck: boolean;
  timestamp: string;
}

export interface CanaryDeploymentProgress {
  componentId: string;
  version: string;
  currentTrafficPct: number;
  stagesCompleted: CanaryStage[];
  isFullyPromoted: boolean;
  hasRolledBack: boolean;
}

export class CanaryManager {
  private activeCanaries: Map<string, CanaryDeploymentProgress> = new Map();

  public startCanaryDeployment(componentId: string, version: string): CanaryDeploymentProgress {
    const progress: CanaryDeploymentProgress = {
      componentId,
      version,
      currentTrafficPct: 1,
      stagesCompleted: [
        {
          stageName: '1% Trial',
          trafficPercentage: 1,
          passedHealthCheck: true,
          timestamp: new Date().toISOString(),
        },
      ],
      isFullyPromoted: false,
      hasRolledBack: false,
    };

    this.activeCanaries.set(componentId, progress);
    return progress;
  }

  public advanceCanary(componentId: string, healthCheckPass: boolean): CanaryDeploymentProgress {
    const canary = this.activeCanaries.get(componentId);
    if (!canary) {
      throw new Error(`Canary Manager Error: No active canary for component '${componentId}'.`);
    }

    if (!healthCheckPass) {
      canary.hasRolledBack = true;
      canary.currentTrafficPct = 0;
      return canary;
    }

    const nextPctMap: Record<number, number> = { 1: 10, 10: 50, 50: 100, 100: 100 };
    const nextPct = nextPctMap[canary.currentTrafficPct] || 100;
    canary.currentTrafficPct = nextPct;

    canary.stagesCompleted.push({
      stageName: `${nextPct}% Fleet Allocation`,
      trafficPercentage: nextPct,
      passedHealthCheck: true,
      timestamp: new Date().toISOString(),
    });

    if (nextPct === 100) {
      canary.isFullyPromoted = true;
    }

    return canary;
  }
}
