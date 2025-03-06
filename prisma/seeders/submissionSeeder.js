import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedSubmissions(user1, projectAlpha, category1) {
  console.log("Seeding Submissions...");
  const submission1 = await prisma.submission.create({
    data: {
      userId: user1.id,
      number: "SUB-001",
      projectId: projectAlpha.id,
      date: new Date(),
      activity: "Activity Sample",
      description: "Submission description sample",
      status: "PENDING",
      submissionDetail: {
        create: [
          {
            name: "Item 1",
            qty: 2,
            categoryId: category1.id,
            amount: 100.0,
            evidence: "evidence1.png"
          },
          {
            name: "Item 2",
            qty: 1,
            categoryId: category1.id,
            amount: 200.0,
            evidence: "evidence2.png"
          }
        ]
      }
    }
  });
  return { submission1 };
}
