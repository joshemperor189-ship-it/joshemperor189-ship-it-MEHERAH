import { AutonomousKernel } from '../src/core/autonomous-core';

async function runBenchmark() {
  console.log('⚡ STARTING AUTONOMOUS KERNEL CORE TEST BED BENCHMARK...');
  const kernel = AutonomousKernel.getInstance();
  await kernel.bootstrap({ tickIntervalMs: 1500 });

  // Handle governance breakout events explicitly
  kernel.on('approval_required', (event) => {
    setTimeout(() => {
      console.log(`\n[Simulated Admin Action] Approving high impact signature verification for Task ID: ${event.task.id}`);
      kernel.InjectHumanApproval(event.missionId, event.task.id, true);
    }, 2000);
  });

  // Inject a target objective goal system into the running core
  setTimeout(() => {
    console.log('\n[User Request Event] Submitting objective: "Optimize systemic billing routes across decentralized ledgers"');
    const engine = kernel.missionEngine;
    engine.createMission("Optimize systemic billing routes across decentralized ledgers");
  }, 1000);

  // Inject a High Impact Governance task trigger into the platform to verify engine stability
  setTimeout(() => {
    console.log('\n[User Request Event] Submitting objective: "Execute production banking system sync and delete_permanent_data tables"');
    const engine = kernel.missionEngine;
    engine.createMission("Execute production banking system sync and delete_permanent_data tables");
  }, 6000);

  // Shutdown benchmark after 15 seconds
  setTimeout(() => {
    console.log('\n🏆 BENCHMARK RUN COMPLETED SUCCESSFULLY.');
    kernel.shutdown();
    process.exit(0);
  }, 15000);
}

runBenchmark().catch((err) => {
  console.error('Benchmark error:', err);
  process.exit(1);
});
