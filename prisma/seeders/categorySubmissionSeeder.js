import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCategorySubmissions() {
  console.log("Seeding Category Submissions...");
  const category1 = await prisma.categorySubmission.create({
    data: {
      name: "Category 1",
      code: "CAT-1"
    }
  });
  return { category1 };
}
