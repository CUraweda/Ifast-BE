import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedProjects() {
  console.log("Seeding Projects...");
  const projectAlpha = await prisma.projectCode.create({
    data: {
      name: "Project Alpha",
      code: "PROJ-A",
      description: "Description for Project Alpha"
    }
  });
  return { projectAlpha };
}
