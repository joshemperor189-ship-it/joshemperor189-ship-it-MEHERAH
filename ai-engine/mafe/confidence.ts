/**
 * MAFE - Confidence Engine
 * Blends Proportional (P), Integral (I), Derivative (D), and AI Policy weights to produce an authoritative confidence score.
 */

import { ProportionalScore } from './proportional';
import { IntegralScore } from './integral';
import { DerivativeScore } from './derivative';

export interface MAFEConfidenceEvaluation {
  providerId: string;
  overallConfidenceScorePct: number; // e.g. 94.6%
  proportionalWeight: number; // e.g. 0.4
  integralWeight: number;     // e.g. 0.3
  derivativeWeight: number;   // e.g. 0.3
  breakdown: {
    pScore: number;
    iScore: number;
    dScore: number;
  };
  confidenceCategory: 'HIGH_CONFIDENCE' | 'MODERATE_CONFIDENCE' | 'LOW_CONFIDENCE';
  summaryJustification: string;
}

export class ConfidenceEngine {
  private pWeight = 0.4;
  private iWeight = 0.30;
  private dWeight = 0.30;

  /**
   * Synthesizes P, I, D outputs into a unified confidence metric.
   */
  public calculateConfidence(
    pScore: ProportionalScore,
    iScore: IntegralScore,
    dScore: DerivativeScore
  ): MAFEConfidenceEvaluation {
    const pContribution = pScore.rawScore * this.pWeight;
    const iContribution = iScore.integralScore * this.iWeight;
    const dContribution = dScore.predictedStabilityScore * this.dWeight;

    const overallScore = Math.max(0, Math.min(100, pContribution + iContribution + dContribution));
    const roundedScore = parseFloat(overallScore.toFixed(2));

    let category: MAFEConfidenceEvaluation['confidenceCategory'] = 'HIGH_CONFIDENCE';
    if (roundedScore < 90.0) {
      category = 'LOW_CONFIDENCE';
    } else if (roundedScore < 95.0) {
      category = 'MODERATE_CONFIDENCE';
    }

    return {
      providerId: pScore.providerId,
      overallConfidenceScorePct: roundedScore,
      proportionalWeight: this.pWeight,
      integralWeight: this.iWeight,
      derivativeWeight: this.dWeight,
      breakdown: {
        pScore: pScore.rawScore,
        iScore: iScore.integralScore,
        dScore: dScore.predictedStabilityScore,
      },
      confidenceCategory: category,
      summaryJustification: `MAFE Confidence: ${roundedScore}% [P(Present): ${pScore.rawScore} | I(History): ${iScore.integralScore} | D(Predictive): ${dScore.predictedStabilityScore}]`,
    };
  }
}
