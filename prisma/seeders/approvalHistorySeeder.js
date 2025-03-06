import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedApprovalHistories(approval1, user1) {
  console.log("Seeding Approval Histories...");
  await prisma.approvalHistory.create({
    data: {
      approvalId: approval1.id,
      actorId: user1.id,
      oldStatus: "PENDING",
      newStatus: "APPROVED",
      comment: "Approved by Admin"
    }
  });
}
