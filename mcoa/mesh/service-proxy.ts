/**
 * MEHERAH Service Mesh - Service Proxy
 * The proxy interposes between components to enforce identity, mTLS authentication,
 * circuit breaking, and telemetry recording.
 */

import { MtlsManager } from './mtls-manager';
import { ServiceCircuitBreaker } from './circuit-breaker';
import { ComponentRegistry } from '../registry/component-registry';

export interface ProxyDispatchResult {
  envelopeId: string;
  sourceId: string;
  targetId: string;
  status: 'DELIVERED_200' | 'BLOCKED_UNAUTHENTICATED' | 'BLOCKED_CIRCUIT_OPEN' | 'FAILOVER_REROUTED';
  routingPath: string;
  latencyMs: number;
}

export class MeherahServiceProxy {
  private mtlsManager: MtlsManager;
  private circuitBreaker: ServiceCircuitBreaker;
  private registry: ComponentRegistry;

  constructor(registry: ComponentRegistry) {
    this.registry = registry;
    this.mtlsManager = new MtlsManager();
    this.circuitBreaker = new ServiceCircuitBreaker();
  }

  public dispatch<T>(sourceId: string, targetId: string, payload: T): ProxyDispatchResult {
    const envelopeId = `PROXY-ENV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const startTime = Date.now();

    // 1. Check Circuit Breaker for Target
    const circuit = this.circuitBreaker.getCircuitState(targetId);
    if (circuit.state === 'OPEN') {
      return {
        envelopeId,
        sourceId,
        targetId,
        status: 'BLOCKED_CIRCUIT_OPEN',
        routingPath: `[CIRCUIT_OPEN] Target '${targetId}' is tripping failures. Intercepting dispatch.`,
        latencyMs: Date.now() - startTime,
      };
    }

    // 2. mTLS Handshake & Authentication
    const mtlsCheck = this.mtlsManager.authenticateHandshake(sourceId, targetId);
    if (!mtlsCheck.authenticated) {
      this.circuitBreaker.recordFailure(targetId);
      return {
        envelopeId,
        sourceId,
        targetId,
        status: 'BLOCKED_UNAUTHENTICATED',
        routingPath: mtlsCheck.routingPath,
        latencyMs: Date.now() - startTime,
      };
    }

    // 3. Dispatch Success
    this.circuitBreaker.recordSuccess(targetId);
    const latencyMs = Math.floor(Math.random() * 8) + 2; // 2-10ms

    return {
      envelopeId,
      sourceId,
      targetId,
      status: 'DELIVERED_200',
      routingPath: mtlsCheck.routingPath,
      latencyMs,
    };
  }

  public getMtlsManager(): MtlsManager {
    return this.mtlsManager;
  }

  public getCircuitBreaker(): ServiceCircuitBreaker {
    return this.circuitBreaker;
  }
}
