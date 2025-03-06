import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedApprovals(submission1) {
  console.log("Seeding Approvals...");
  const approval1 = await prisma.approval.create({
    data: {
      submissionId: submission1.id,
      sequence: 1,
      requiredRole: "ADMIN",
      status: "PENDING"
    }
  });
  const approval2 = await prisma.approval.create({
    data: {
      submissionId: submission1.id,
      sequence: 2,
      requiredRole: "MANAGER",
      status: "PENDING"
    }
  });
  const approval3 = await prisma.approval.create({
    data: {
      submissionId: submission1.id,
      sequence: 3,
      requiredRole: "DIRECTOR",
      status: "PENDING"
    }
  });
  return { approval1, approval2, approval3 };
}
