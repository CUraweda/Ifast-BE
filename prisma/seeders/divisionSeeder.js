import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedDivisions() {
  console.log("Seeding Divisions...");
  const divisionA = await prisma.division.create({
    data: {
      name: "Division A",
      Code: "DIV-A"
    }
  });
  const divisionB = await prisma.division.create({
    data: {
      name: "Division B",
      Code: "DIV-B"
    }
  });
  return { divisionA, divisionB };
}
