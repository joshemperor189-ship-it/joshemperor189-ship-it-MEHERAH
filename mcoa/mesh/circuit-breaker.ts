/**
 * MEHERAH Service Mesh - Circuit Breaker
 * Protects components from cascading failures by monitoring error rates and latency SLAs,
 * shifting between CLOSED (normal), OPEN (tripped/failing over), and HALF_OPEN (recovery testing).
 */

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitMetrics {
  componentId: string;
  state: CircuitState;
  consecutiveFailures: number;
  lastFailureTimestamp?: number;
  totalRequests: number;
}

export class ServiceCircuitBreaker {
  private circuits: Map<string, CircuitMetrics> = new Map();
  private maxConsecutiveFailures: number = 3;
  private recoveryTimeoutMs: number = 10000;

  public getCircuitState(componentId: string): CircuitMetrics {
    if (!this.circuits.has(componentId)) {
      this.circuits.set(componentId, {
        componentId,
        state: 'CLOSED',
        consecutiveFailures: 0,
        totalRequests: 0,
      });
    }
    const circuit = this.circuits.get(componentId)!;

    // Check if recovery window passed for OPEN circuit
    if (circuit.state === 'OPEN' && circuit.lastFailureTimestamp) {
      if (Date.now() - circuit.lastFailureTimestamp > this.recoveryTimeoutMs) {
        circuit.state = 'HALF_OPEN';
      }
    }

    return circuit;
  }

  public recordSuccess(componentId: string): void {
    const circuit = this.getCircuitState(componentId);
    circuit.totalRequests += 1;
    circuit.consecutiveFailures = 0;
    if (circuit.state === 'HALF_OPEN') {
      circuit.state = 'CLOSED';
    }
  }

  public recordFailure(componentId: string): void {
    const circuit = this.getCircuitState(componentId);
    circuit.totalRequests += 1;
    circuit.consecutiveFailures += 1;
    circuit.lastFailureTimestamp = Date.now();

    if (circuit.consecutiveFailures >= this.maxConsecutiveFailures) {
      circuit.state = 'OPEN';
    }
  }
}
