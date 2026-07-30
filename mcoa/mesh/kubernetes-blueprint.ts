/**
 * MEHERAH MCOA - Kubernetes Sidecar Service Mesh Blueprint
 * Defines the Kubernetes declarative configuration objects and sidecar proxy manifests
 * separating application business logic from communication, security (mTLS), and observability.
 */

export interface K8sPodBlueprint {
  podName: string;
  namespace: string;
  appContainer: {
    name: string;
    image: string;
    port: number;
    responsibility: string; // e.g., 'Business Logic Only (MAFE PID Engine)'
  };
  sidecarProxyContainer: {
    name: string;
    image: string;
    listenPort: number;
    capabilities: string[]; // ['mTLS Encryption', 'Circuit Breaker', 'Automatic Retries', 'Distributed Tracing', 'Rate Limiting']
  };
  mtlsConfig: {
    enabled: boolean;
    certificateAuthority: string;
    identitySecretName: string;
  };
  healthCheckEndpoint: string;
}

export interface K8sControlPlaneBlueprint {
  clusterName: string;
  controlPlaneServices: {
    componentRegistry: string;
    serviceDiscovery: string;
    policyController: string;
    certificateAuthority: string;
  };
  meshPolicies: {
    mtlsStrict: boolean;
    circuitBreakerConsecutiveErrors: number;
    retryMaxAttempts: number;
    rateLimitRequestsPerSec: number;
  };
  pods: K8sPodBlueprint[];
}

export class KubernetesBlueprintGenerator {
  public generateBlueprint(): K8sControlPlaneBlueprint {
    return {
      clusterName: 'meherah-uganda-k8s-mesh-sandbox',
      controlPlaneServices: {
        componentRegistry: 'mcoa-component-registry.meherah.internal:8080',
        serviceDiscovery: 'mcoa-dns.meherah.internal:53',
        policyController: 'mcoa-policy-engine.meherah.internal:8443',
        certificateAuthority: 'mcoa-hsm-ca.meherah.internal:8443',
      },
      meshPolicies: {
        mtlsStrict: true,
        circuitBreakerConsecutiveErrors: 3,
        retryMaxAttempts: 3,
        rateLimitRequestsPerSec: 500,
      },
      pods: [
        {
          podName: 'routing-service-pod-7f98d',
          namespace: 'meherah-core',
          appContainer: {
            name: 'routing-service',
            image: 'gcr.io/meherah-uganda/routing-service:v2.1.0',
            port: 3000,
            responsibility: 'Financial Routing & Provider Rail Decision Logic',
          },
          sidecarProxyContainer: {
            name: 'meherah-sidecar-proxy',
            image: 'gcr.io/meherah-uganda/sidecar-proxy:v1.4.2',
            listenPort: 15001,
            capabilities: [
              'mTLS Certificate Authentication',
              'Automatic Retries (Exponential Backoff)',
              'Circuit Breaker Intercept',
              'Distributed Tracing (OpenTelemetry)',
              'Rate Limiting Guard',
            ],
          },
          mtlsConfig: {
            enabled: true,
            certificateAuthority: 'HSM_FIPS140_3_CA',
            identitySecretName: 'routing-service-mtls-cert',
          },
          healthCheckEndpoint: '/healthz',
        },
        {
          podName: 'ledger-service-pod-3b21c',
          namespace: 'meherah-core',
          appContainer: {
            name: 'ledger-service',
            image: 'gcr.io/meherah-uganda/ledger-service:v1.8.0',
            port: 3001,
            responsibility: 'Double-Entry Ledger & Cryptographic Receipt Storage',
          },
          sidecarProxyContainer: {
            name: 'meherah-sidecar-proxy',
            image: 'gcr.io/meherah-uganda/sidecar-proxy:v1.4.2',
            listenPort: 15001,
            capabilities: [
              'Authenticates Caller Identity via mTLS',
              'Applies Zero-Trust Role Policy',
              'Encrypts In-Transit Payload',
              'Streams Telemetry to Mission Control',
            ],
          },
          mtlsConfig: {
            enabled: true,
            certificateAuthority: 'HSM_FIPS140_3_CA',
            identitySecretName: 'ledger-service-mtls-cert',
          },
          healthCheckEndpoint: '/healthz',
        },
        {
          podName: 'mafe-engine-pod-9c44a',
          namespace: 'meherah-core',
          appContainer: {
            name: 'mafe-pid-engine',
            image: 'gcr.io/meherah-uganda/mafe-engine:v2.0.0',
            port: 3002,
            responsibility: 'Adaptive Financial Feedback & PID Rate Regulation',
          },
          sidecarProxyContainer: {
            name: 'meherah-sidecar-proxy',
            image: 'gcr.io/meherah-uganda/sidecar-proxy:v1.4.2',
            listenPort: 15001,
            capabilities: [
              'mTLS Strict Isolation',
              'Metrics Export to Digital Twin',
              'Latency Anomaly Circuit Breaker',
            ],
          },
          mtlsConfig: {
            enabled: true,
            certificateAuthority: 'HSM_FIPS140_3_CA',
            identitySecretName: 'mafe-engine-mtls-cert',
          },
          healthCheckEndpoint: '/healthz',
        },
      ],
    };
  }

  public generateYamlManifest(pod: K8sPodBlueprint): string {
    return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${pod.appContainer.name}
  namespace: ${pod.namespace}
  labels:
    app.kubernetes.io/part-of: meherah-mcoa-mesh
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: ${pod.appContainer.name}
    spec:
      containers:
      # --- Application Container (Business Logic Only) ---
      - name: ${pod.appContainer.name}
        image: ${pod.appContainer.image}
        ports:
        - containerPort: ${pod.appContainer.port}
        env:
        - name: MESH_PROXY_HOST
          value: "127.0.0.1"
        - name: MESH_PROXY_PORT
          value: "${pod.sidecarProxyContainer.listenPort}"
      # --- MEHERAH Sidecar Proxy (Security & Mesh Transport) ---
      - name: ${pod.sidecarProxyContainer.name}
        image: ${pod.sidecarProxyContainer.image}
        ports:
        - containerPort: ${pod.sidecarProxyContainer.listenPort}
        volumeMounts:
        - name: mtls-certs
          mountPath: /etc/meherah/certs
          readOnly: true
      volumes:
      - name: mtls-certs
        secret:
          secretName: ${pod.mtlsConfig.identitySecretName}`;
  }
}
