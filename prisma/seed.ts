import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MEHERAH OS Enterprise Control Plane initialization seed script...');

  // 1. Purge previous entities cleanly to preserve local unique database constraints
  await prisma.missionApproval.deleteMany();
  await prisma.auditEvent.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  // 2. Initialize Master Multi-Tenant Corporate Anchors
  const bankOrg = await prisma.organization.create({
    data: {
      name: 'Pearl Regional Banking Group',
      tier: 'SOVEREIGN_NODE',
    },
  });

  const govOrg = await prisma.organization.create({
    data: {
      name: 'Uganda Treasury Open Liquidity Unit',
      tier: 'GOVERNMENT',
    },
  });

  console.log(`✅ Provisioned ${2} Enterprise Tenant environments.`);

  // 3. Populate Hardened Corporate Operations Personnel Profiles
  const superUser = await prisma.user.create({
    data: {
      orgId: bankOrg.orgId,
      email: 'chief.operator@pearlbank.co.ug',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  const analystUser = await prisma.user.create({
    data: {
      orgId: govOrg.orgId,
      email: 'lead.analyst@treasury.go.ug',
      role: 'ANALYST',
      isActive: true,
    },
  });

  console.log('✅ Synchronized structural operator hierarchy assignments.');

  // 4. Seed Protected Vault API Keys Mock Hashes
  await prisma.apiKey.create({
    data: {
      orgId: bankOrg.orgId,
      name: 'MTN Open API Production Link Token',
      encryptedSecret: 'e6a8d32b5f91c7a40b923fde88ac1129bc78e0f142da0932bc',
      iv: 'd37506f0a500e6e1d6706b60a39e93bc',
      tag: 'a39e93706b60e6e1',
    },
  });

  // 5. Build Initial Block-Chained Compliance Ledger Archetype Rows
  const initEvent = await prisma.auditEvent.create({
    data: {
      orgId: bankOrg.orgId,
      userId: superUser.userId,
      agentName: 'Chief Agent',
      action: 'user.authenticate',
      previousState: '{}',
      newState: JSON.stringify({ context: 'Cloud Run Session Init', operatorId: superUser.userId }),
      cryptoHash: crypto.createHmac('sha256', 'meherah-audit-salt').update('genesis-anchor-payload-block').digest('hex'),
    },
  });

  // 6. Seed Holding Human-in-the-Loop Interceptor Policy Approvals
  await prisma.missionApproval.create({
    data: {
      orgId: bankOrg.orgId,
      requestedByUserId: superUser.userId,
      riskLevel: 'HIGH',
      targetAction: 'finance.route.settlement.execute',
      status: 'PENDING',
    },
  });

  console.log('✅ Seeded cryptographic logs and active interceptor approval modals.');
  console.log('🚀 MEHERAH OS Enterprise initialization pipeline finalized successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Data seed process hit errors:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
