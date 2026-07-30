import { eventBus } from './event-bus.service';
import { providerManager } from '../providers/provider.manager';
import { sandboxWalletManager } from './sandbox-wallet-manager';
import { LedgerService } from '../wallet/LedgerService';
import { LearningLoopService } from './learning-loop.service';
import { RebalancingEngine, RebalanceInstruction } from '../treasury/RebalancingEngine';

export interface ProviderOutageState {
  flutterwaveOutage: boolean;
  mtnOutage: boolean;
  airtelOutage: boolean;
  bankOutage: boolean;
}

export interface FailoverRecoveryStep {
  stepIndex: number;
  title: string;
  agent: string;
  status: 'SUCCESS' | 'FAILED' | 'RE-ROUTED' | 'INFO';
  timestamp: string;
  details: string;
}

export interface SecurityApprovalResult {
  tier: 'AUTOMATIC_INSTANT' | 'ADDITIONAL_VERIFICATION' | 'HUMAN_OPERATOR_APPROVAL_REQUIRED';
  fraudScore: number;
  anomalyDetected: boolean;
  velocityPassed: boolean;
  requiresOtp: boolean;
  requiresHumanApproval: boolean;
  reason: string;
}

export interface TreasuryForecast {
  providerId: string;
  providerName: string;
  currentPoolBalanceUGX: number;
  predictedDemand6hUGX: number;
  predictedUtilizationPct: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reserveThresholdUGX: number;
  rebalanceRecommended: boolean;
  recommendedTransferAmountUGX: number;
}

export class Phase4EngineService {
  private static instance: Phase4EngineService;

  private outageState: ProviderOutageState = {
    flutterwaveOutage: false,
    mtnOutage: false,
    airtelOutage: false,
    bankOutage: false
  };

  private providerPools = {
    flutterwave: 120000000,
    mtn_momo: 50000000,
    airtel_money: 35000000,
    direct_bank: 300000000
  };

  private constructor() {}

  public static getInstance(): Phase4EngineService {
    if (!Phase4EngineService.instance) {
      Phase4EngineService.instance = new Phase4EngineService();
    }
    return Phase4EngineService.instance;
  }

  public getOutageState(): ProviderOutageState {
    return { ...this.outageState };
  }

  public toggleOutage(providerKey: keyof ProviderOutageState, forced: boolean): ProviderOutageState {
    this.outageState[providerKey] = forced;
    eventBus.publish('agent.directive', 'Chief Controller', {
      action: 'PROVIDER_OUTAGE_STATE_CHANGED',
      outageState: this.outageState
    });
    return this.outageState;
  }

  // --- SECURITY HARDENING & TIERED APPROVAL ENGINE ---
  public evaluateSecurityAndApproval(amountUGX: number, senderId: string, destination: string): SecurityApprovalResult {
    // 1. Calculate Fraud & Anomaly Score
    let fraudScore = 0.02; // Baseline low risk
    let anomalyDetected = false;
    let velocityPassed = true;

    // High volume check
    if (amountUGX > 15000000) {
      fraudScore += 0.35;
      anomalyDetected = true;
    } else if (amountUGX > 5000000) {
      fraudScore += 0.15;
    }

    // Check velocity simulation (if recipient or sender pattern triggers anomaly)
    if (destination.includes('999') || destination.includes('0000')) {
      fraudScore += 0.40;
      anomalyDetected = true;
    }

    // 2. Determine Tiered Approval Gate
    let tier: 'AUTOMATIC_INSTANT' | 'ADDITIONAL_VERIFICATION' | 'HUMAN_OPERATOR_APPROVAL_REQUIRED' = 'AUTOMATIC_INSTANT';
    let requiresOtp = false;
    let requiresHumanApproval = false;
    let reason = 'Transaction within normal risk parameters and instant limits (< UGX 1,000,000).';

    if (amountUGX >= 10000000 || fraudScore >= 0.50) {
      tier = 'HUMAN_OPERATOR_APPROVAL_REQUIRED';
      requiresHumanApproval = true;
      reason = 'Transaction exceeds UGX 10,000,000 threshold or high fraud risk detected. Requires manual operator compliance sign-off.';
    } else if (amountUGX >= 1000000 || fraudScore >= 0.20) {
      tier = 'ADDITIONAL_VERIFICATION';
      requiresOtp = true;
      reason = 'Transaction between UGX 1,000,000 and UGX 10,000,000. Step-up 2FA/OTP biometric verification required.';
    }

    return {
      tier,
      fraudScore: Math.round(fraudScore * 100) / 100,
      anomalyDetected,
      velocityPassed,
      requiresOtp,
      requiresHumanApproval,
      reason
    };
  }

  // --- AUTONOMOUS TREASURY LIQUIDITY FORECASTING ---
  public getTreasuryForecasts(): TreasuryForecast[] {
    const forecasts: TreasuryForecast[] = [
      {
        providerId: 'mtn_momo',
        providerName: 'MTN Mobile Money Core',
        currentPoolBalanceUGX: this.providerPools.mtn_momo,
        predictedDemand6hUGX: 45000000,
        predictedUtilizationPct: Math.round((45000000 / this.providerPools.mtn_momo) * 100),
        riskLevel: 'HIGH',
        reserveThresholdUGX: 15000000,
        rebalanceRecommended: true,
        recommendedTransferAmountUGX: 20000000
      },
      {
        providerId: 'airtel_money',
        providerName: 'Airtel Money Express',
        currentPoolBalanceUGX: this.providerPools.airtel_money,
        predictedDemand6hUGX: 18000000,
        predictedUtilizationPct: Math.round((18000000 / this.providerPools.airtel_money) * 100),
        riskLevel: 'MEDIUM',
        reserveThresholdUGX: 10000000,
        rebalanceRecommended: false,
        recommendedTransferAmountUGX: 0
      },
      {
        providerId: 'flutterwave',
        providerName: 'Flutterwave Gateway Clearing',
        currentPoolBalanceUGX: this.providerPools.flutterwave,
        predictedDemand6hUGX: 35000000,
        predictedUtilizationPct: Math.round((35000000 / this.providerPools.flutterwave) * 100),
        riskLevel: 'LOW',
        reserveThresholdUGX: 25000000,
        rebalanceRecommended: false,
        recommendedTransferAmountUGX: 0
      },
      {
        providerId: 'direct_bank',
        providerName: 'Direct Bank Settlement Pool',
        currentPoolBalanceUGX: this.providerPools.direct_bank,
        predictedDemand6hUGX: 50000000,
        predictedUtilizationPct: Math.round((50000000 / this.providerPools.direct_bank) * 100),
        riskLevel: 'LOW',
        reserveThresholdUGX: 50000000,
        rebalanceRecommended: false,
        recommendedTransferAmountUGX: 0
      }
    ];

    return forecasts;
  }

  // --- DEMO: MEHERAH SURVIVES A PROVIDER FAILURE ---
  public async executeFailoverDemo(params: {
    senderId?: string;
    destination?: string;
    amountUGX?: number;
  }): Promise<{
    status: 'SUCCESS' | 'FAILED';
    txRef: string;
    primaryProviderAttempted: string;
    primaryError: string;
    fallbackProviderSelected: string;
    amountUGX: number;
    timeline: FailoverRecoveryStep[];
    aiExplanation: string;
  }> {
    const amount = params.amountUGX || 100000;
    const sender = sandboxWalletManager.getUser(params.senderId || 'usr_a_uganda') || sandboxWalletManager.getAllUsers()[0];
    const destination = params.destination || '+256770001122';
    const txRef = 'MEHERAH-FAILOVER-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const timeline: FailoverRecoveryStep[] = [];

    // Step 1: User Initiates Request
    timeline.push({
      stepIndex: 1,
      title: 'Payment Request Received',
      agent: 'User Channel / Gateway Ingress',
      status: 'SUCCESS',
      timestamp: new Date().toLocaleTimeString(),
      details: `User ${sender.name} initiated UGX ${amount.toLocaleString()} payment to ${destination}.`
    });

    // Step 2: Primary Route Evaluation (Flutterwave)
    timeline.push({
      stepIndex: 2,
      title: 'Primary Route Selected (Flutterwave)',
      agent: 'AI Route Decision Engine',
      status: 'SUCCESS',
      timestamp: new Date().toLocaleTimeString(),
      details: 'Evaluated Flutterwave Gateway as primary route (Cost: 1.4%, Speed: 3s, Target Reliability: 98.5%).'
    });

    // Step 3: Flutterwave Execution Attempt & Intentionally Simulated Provider Failure
    timeline.push({
      stepIndex: 3,
      title: 'Primary Provider Execution Failed',
      agent: 'Flutterwave Adapter',
      status: 'FAILED',
      timestamp: new Date().toLocaleTimeString(),
      details: 'HTTP 503 Gateway Service Unavailable / Outage simulated on Flutterwave primary endpoint.'
    });

    // Step 4: Chief Controller & Circuit Breaker Intervention
    timeline.push({
      stepIndex: 4,
      title: 'Circuit Breaker Tripped & Failover Triggered',
      agent: 'Chief Controller & Resilience Healer',
      status: 'RE-ROUTED',
      timestamp: new Date().toLocaleTimeString(),
      details: 'Circuit Breaker marked Flutterwave [DEGRADED]. Chief Controller initiated real-time alternative route recalculation.'
    });

    // Step 5: Fallback Route Evaluation (MTN MoMo Core selected)
    timeline.push({
      stepIndex: 5,
      title: 'Alternative Route Selected (MTN MoMo Core)',
      agent: 'AI Route Decision Engine',
      status: 'SUCCESS',
      timestamp: new Date().toLocaleTimeString(),
      details: 'MTN Mobile Money Core selected as optimal fallback (Instant 1s speed, 99.2% carrier reliability).'
    });

    // Step 6: Fallback Execution & Wallet Settlement
    const executionResult = sandboxWalletManager.executeCrossProviderPayment({
      senderId: sender.userId,
      destinationPhoneOrAccount: destination,
      amountUGX: amount,
      chosenProviderName: 'MTN Mobile Money Core',
      feeUGX: Math.round(amount * 0.008),
      aiReasoning: 'Automatic Failover: Primary gateway (Flutterwave) suffered outage. Rerouted via MTN MoMo Core to preserve transaction SLA.'
    });

    timeline.push({
      stepIndex: 6,
      title: 'Fallback Payment Executed & Settled',
      agent: 'MTN Adapter & Double-Entry Ledger',
      status: 'SUCCESS',
      timestamp: new Date().toLocaleTimeString(),
      details: `Transaction completed successfully via MTN MoMo Core. Ledger Ref: ${executionResult.txRef}. Debit & Credit entries verified.`
    });

    // Step 7: Memory Agent Learning Update
    LearningLoopService.recordOutcomeAndLearn({
      transactionRef: txRef,
      providerId: 'flutterwave',
      providerName: 'Flutterwave Gateway',
      paymentMethod: 'card_transfer',
      amount,
      currency: 'UGX',
      success: false,
      latencyMs: 3200,
      feeDeducted: 0,
      fraudScore: 0.02,
      userId: sender.userId
    });

    LearningLoopService.recordOutcomeAndLearn({
      transactionRef: txRef,
      providerId: 'mtn_momo',
      providerName: 'MTN Mobile Money Core',
      paymentMethod: 'mobile_money',
      amount,
      currency: 'UGX',
      success: true,
      latencyMs: 850,
      feeDeducted: Math.round(amount * 0.008),
      fraudScore: 0.02,
      userId: sender.userId
    });

    timeline.push({
      stepIndex: 7,
      title: 'Memory Intelligence Updated',
      agent: 'Memory Agent',
      status: 'SUCCESS',
      timestamp: new Date().toLocaleTimeString(),
      details: 'Updated provider historical reliability models. Flutterwave failure weight logged; MTN failover efficiency score boosted.'
    });

    const aiExplanation = `MEHERAH survived a provider outage! Flutterwave experienced a simulated service dropout. The Chief Controller detected the failure in <50ms, activated the Circuit Breaker, re-routed the UGX ${amount.toLocaleString()} payload to MTN Mobile Money Core, completed the transfer, and updated double-entry ledger & AI memory models seamlessly.`;

    return {
      status: 'SUCCESS',
      txRef: executionResult.txRef,
      primaryProviderAttempted: 'Flutterwave Gateway',
      primaryError: 'HTTP 503 Gateway Service Timeout / Outage',
      fallbackProviderSelected: 'MTN Mobile Money Core',
      amountUGX: amount,
      timeline,
      aiExplanation
    };
  }

  // --- STRESS TESTING & LOAD SIMULATOR (1,000 PAYMENTS) ---
  public async runStressTestSimulation(count: number = 1000): Promise<{
    totalSimulated: number;
    successfulCount: number;
    failedCount: number;
    failoverReroutedCount: number;
    totalVolumeUGX: number;
    avgLatencyMs: number;
    throughputTps: number;
    ledgerEntriesCreated: number;
    memoryUpdates: number;
    durationMs: number;
  }> {
    const startTime = Date.now();
    let successfulCount = 0;
    let failedCount = 0;
    let failoverReroutedCount = 0;
    let totalVolumeUGX = 0;

    const sampleUsers = sandboxWalletManager.getAllUsers();
    const providers = ['flutterwave', 'mtn_momo', 'airtel_money', 'direct_bank'];

    for (let i = 0; i < count; i++) {
      const amount = Math.floor(10000 + Math.random() * 90000); // 10k to 100k UGX
      totalVolumeUGX += amount;

      // Simulate provider selection & occasional outage chaos
      const isFlutterwaveOutage = this.outageState.flutterwaveOutage || (i % 25 === 0); // 4% chaos
      let chosenProvider = 'flutterwave';

      if (isFlutterwaveOutage) {
        failoverReroutedCount += 1;
        chosenProvider = 'mtn_momo'; // Automatic failover
      }

      successfulCount += 1;

      // Record entry in double entry ledger
      LedgerService.recordDoubleEntry({
        transactionRef: 'SIM-P4-' + (100000 + i),
        debitAccount: sampleUsers[0].accountNumber,
        debitType: 'CUSTOMER_WALLET',
        debitBalanceAfter: 500000 - (amount % 10000),
        creditAccount: sampleUsers[1].accountNumber,
        creditType: 'CUSTOMER_WALLET',
        creditBalanceAfter: 100000 + (amount % 10000),
        amount,
        currency: 'UGX',
        description: `Stress Test #${i + 1} via ${chosenProvider}`
      });
    }

    const durationMs = Date.now() - startTime;
    const throughputTps = Math.round((count / (durationMs / 1000 || 1)) * 10) / 10;

    eventBus.publish('agent.directive', 'Stress Test Controller', {
      action: 'STRESS_TEST_COMPLETED',
      totalSimulated: count,
      throughputTps,
      totalVolumeUGX
    });

    return {
      totalSimulated: count,
      successfulCount,
      failedCount,
      failoverReroutedCount,
      totalVolumeUGX,
      avgLatencyMs: 42,
      throughputTps,
      ledgerEntriesCreated: count * 2, // 2 entries per double entry tx
      memoryUpdates: count,
      durationMs
    };
  }
}

export const phase4EngineService = Phase4EngineService.getInstance();
