import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { seedDivisions } from './divisionSeeder.js';
import { seedRoles } from './roleSeeder.js';
import { seedUsers } from './userSeeder.js';
import { seedBankAccounts } from './bankAccountSeeder.js';
import { seedProjects } from './projectSeeder.js';
import { seedCategorySubmissions } from './categorySubmissionSeeder.js';
import { seedSubmissions } from './submissionSeeder.js';
import { seedApprovals } from './approvalSeeder.js';
import { seedApprovalHistories } from './approvalHistorySeeder.js';

async function main() {
  try {
    console.log("Starting seeding process...");

    const { divisionA, divisionB } = await seedDivisions();
    const roles = await seedRoles();
    const { user1, user2 } = await seedUsers(divisionA, divisionB, roles);
    await seedBankAccounts(user1, user2);
    const { projectAlpha } = await seedProjects();
    const { category1 } = await seedCategorySubmissions();
    const { submission1 } = await seedSubmissions(user1, projectAlpha, category1);
    const { approval1 } = await seedApprovals(submission1);
    await seedApprovalHistories(approval1, user1);

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
