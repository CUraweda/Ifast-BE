import { PrismaClient } from '@prisma/client';
import { hash, compare } from '../../src/helpers/bcrypt.helper.js';

const prisma = new PrismaClient();

export async function seedUsers(divisionA, divisionB, roles) {
  console.log("Seeding Users...");
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: await hash('password'),
      nik: 123456,
      divisionId: divisionA.id,
      roles: {
        connect: [
          { id: roles.roleAdmin.id },
          { id: roles.roleManager.id },
          { id: roles.roleDirector.id }
        ]
      }
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: await hash('password'),
      nik: 654321,
      divisionId: divisionB.id,
      roles: {
        connect: [
          { id: roles.roleManager.id }
        ]
      }
    }
  });

  return { user1, user2 };
}
