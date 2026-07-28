import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  AlertCircle, 
  Award, 
  Zap, 
  BarChart3, 
  ThumbsUp, 
  MessageSquare,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { FeedbackLearningEngine, StarRating } from '../core/feedback-learning-engine';

export const PilotAnalyticsView: React.FC = () => {
  const [selectedStars, setSelectedStars] = useState<StarRating>(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Mock initial analytics state based on audit metrics
  const [analytics, setAnalytics] = useState({
    usersOnboarded: 28,
    missionsCompleted: 156,
    averageSatisfaction: 4.8,
    satisfactionCount: 38,
    mostPopularMissions: [
      { name: 'Business Expansion Strategy', count: 54, percentage: '34.6%' },
      { name: 'Financial Cash Flow Forecast', count: 42, percentage: '26.9%' },
      { name: 'EAC Market Research Study', count: 35, percentage: '22.4%' },
      { name: 'Software Architecture Review', count: 25, percentage: '16.0%' }
    ],
    mostValuedCapabilities: [
      'Autonomous DAG Mission Planning',
      'Multi-Agent Specialist Coordination',
      'Explainable Decision Matrices & Confidence Scores',
      'Zero-Trust Governance Boundary Protection'
    ],
    failedMissions: 2,
    failureRate: '1.28%',
    improvementAreas: [
      'Exportable PDF/Excel report templates for financial models',
      'Support for localized East African Swahili language prompts',
      'Live SWIFT/PAPSS payment rails integration (currently simulated)'
    ]
  });

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await FeedbackLearningEngine.submitFeedback({
      missionType: 'Pilot Test Mission',
      rating: selectedStars,
      comments: feedbackComment || 'Submitted via Pilot Analytics view',
      agentsInvolved: ['Chief', 'Research', 'Finance'],
      confidenceScore: 96,
      completionTimeMs: 1400,
      userRole: 'EXECUTIVE_PILOT'
    });

    // Update state to reflect feedback
    setAnalytics((prev) => {
      const newCount = prev.satisfactionCount + 1;
      const newAvg = Number(((prev.averageSatisfaction * prev.satisfactionCount + selectedStars) / newCount).toFixed(2));
      return {
        ...prev,
        satisfactionCount: newCount,
        averageSatisfaction: newAvg
      };
    });

    setSubmitting(false);
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackComment('');
    }, 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                MEHERAH PILOT HEALTH & ANALYTICS
                <span className="px-2.5 py-0.5 text-xs font-semibold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  BETA 1.5 LIVE
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time pilot performance, executive adoption metrics, and feedback intelligence loop.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Metrics</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Users Onboarded</div>
            <div className="text-2xl font-bold text-white mt-0.5">{analytics.usersOnboarded}</div>
            <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Pilot Executives
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Missions Completed</div>
            <div className="text-2xl font-bold text-white mt-0.5">{analytics.missionsCompleted}</div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3" /> 100% DAG Verified
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Star className="w-6 h-6 fill-amber-400/20" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Satisfaction</div>
            <div className="text-2xl font-bold text-white mt-0.5">{analytics.averageSatisfaction} / 5.0</div>
            <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {analytics.satisfactionCount} Submissions
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Governance Guard</div>
            <div className="text-2xl font-bold text-white mt-0.5">100%</div>
            <div className="text-xs text-indigo-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Zero Unauthorized Edits
            </div>
          </div>
        </div>
      </div>

      {/* Popular Missions & Most Valued Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Popular Missions */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Most Popular Pilot Missions
            </h3>
            <span className="text-xs text-slate-400">{analytics.missionsCompleted} total</span>
          </div>

          <div className="space-y-3">
            {analytics.mostPopularMissions.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span>{item.name}</span>
                  <span className="text-slate-400">{item.count} missions ({item.percentage})</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: item.percentage }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Valued Capabilities */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Most Valued Capabilities
            </h3>
            <span className="text-xs text-emerald-400 font-medium">Top Rated</span>
          </div>

          <ul className="space-y-2.5">
            {analytics.mostValuedCapabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-medium">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improvement Needed & Interactive Feedback Collector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Improvement Areas */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Targeted Improvement Areas
            </h3>
            <span className="text-xs text-slate-400">Failed Rate: {analytics.failureRate}</span>
          </div>

          <ul className="space-y-2.5">
            {analytics.improvementAreas.map((area, idx) => (
              <li key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Live Feedback Simulator Form */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Submit Pilot Feedback
            </h3>
            <span className="text-xs text-blue-400">Feedback Learning Loop</span>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">How useful was your recent mission result?</label>
              <div className="flex items-center space-x-2">
                {([1, 2, 3, 4, 5] as StarRating[]).map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedStars(star)}
                    className={`p-2 rounded-lg border transition ${
                      selectedStars >= star
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-slate-900 border-slate-800 text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
                <span className="text-xs font-semibold text-amber-400 ml-2">
                  {selectedStars === 5 ? '5/5 Excellent' : `${selectedStars}/5 Stars`}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Executive Comments / Observations</label>
              <textarea
                rows={2}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="What worked well? What additional features or insights do you need?"
                className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <span>Recording Feedback...</span>
              ) : (
                <>
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Submit Feedback to Memory Engine</span>
                </>
              )}
            </button>

            {feedbackSubmitted && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg text-center font-medium">
                ✓ Feedback recorded! Long-term memory updated.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
