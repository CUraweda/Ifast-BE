import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRoles() {
  console.log("Seeding Roles...");
  const roleAdmin = await prisma.roles.create({
    data: {
      name: "Admin",
      code: "ADMIN"
    }
  });
  const roleManager = await prisma.roles.create({
    data: {
      name: "Manager",
      code: "MANAGER"
    }
  });
  const roleDirector = await prisma.roles.create({
    data: {
      name: "Director",
      code: "DIRECTOR"
    }
  });
  return { roleAdmin, roleManager, roleDirector };
}
