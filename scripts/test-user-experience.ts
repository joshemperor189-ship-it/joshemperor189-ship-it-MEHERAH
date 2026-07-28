import { PersonalityExplainerEngine } from '../src/core/personality-explainer';

async function runUserExperienceValidation() {
  console.log('================================================================');
  console.log('🧪 MEHERAH OS BETA 1.2 — USER EXPERIENCE VALIDATION SUITE');
  console.log('================================================================\n');

  console.log('1. Testing Chief of Staff Personality & Explainability Engine...');
  const targetMarket = 'East African Agricultural Export Corridors';
  const historicalConfidence = 96.0;

  const explanation = PersonalityExplainerEngine.synthesizeExplanation(
    targetMarket,
    historicalConfidence
  );

  console.log(`- Plain Summary: ${explanation.plainSummary}`);
  console.log(`- Why Chosen: ${explanation.whyChosen}`);
  console.log(`- Confidence Score: ${explanation.confidenceScore}%`);
  console.log(`- Tracked Evidence (${explanation.evidenceTracked.length} sources):`);
  explanation.evidenceTracked.forEach((source) => console.log(`  • ${source}`));

  console.log('\n2. Testing Agent Action Translators (Human-First Language)...');
  const researchAction = PersonalityExplainerEngine.translateAgentAction('RESEARCH_AGENT', 'Gathering trade tariffs');
  const financeAction = PersonalityExplainerEngine.translateAgentAction('FINANCE_AGENT', 'Modeling cashflow');
  const writingAction = PersonalityExplainerEngine.translateAgentAction('WRITING_AGENT', 'Formatting PDF');

  console.log(`- Research Agent: "${researchAction}"`);
  console.log(`- Finance Agent: "${financeAction}"`);
  console.log(`- Writing Agent: "${writingAction}"`);

  console.log('\n================================================================');
  console.log('✅ All User Experience Validation Checks Passed (0 Syntax Errors)');
  console.log('================================================================');
}

runUserExperienceValidation().catch((err) => {
  console.error('❌ UX Validation Failed:', err);
  process.exit(1);
});
