import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedHirarky() {
  console.log("Seeding Hirarky Configuration...");

  // Buat user approver khusus (apabila belum ada)
  const adminUser = await prisma.user.create({
    data: {
      email: "approver_admin@example.com",
      password: "password123",
      nik: 111111,
      division: { 
        create: { 
          name: "Approver Division",
          Code: "APP-DIV-ADMIN"
        } 
      },
      roles: { connect: [] }
    }
  });

  const managerUser = await prisma.user.create({
    data: {
      email: "approver_manager@example.com",
      password: "password123",
      nik: 222222,
      division: { 
        create: { 
          name: "Approver Division",
          Code: "APP-DIV-MANAGER"
        } 
      },
      roles: { connect: [] }
    }
  });

  const directorUser = await prisma.user.create({
    data: {
      email: "approver_director@example.com",
      password: "password123",
      nik: 333333,
      division: { 
        create: { 
          name: "Approver Division",
          Code: "APP-DIV-DIRECTOR"
        } 
      },
      roles: { connect: [] }
    }
  });

  // Buat konfigurasi Hirarky yang tidak terikat ke user secara langsung
  const hirarky = await prisma.hirarky.create({
    data: {
      name: "Approval 3 Level Standard",
      description: "Approval chain: ADMIN, MANAGER, DIRECTOR",
      levels: {
        create: [
          {
            sequence: 1,
            requiredRole: "ADMIN",
            approverId: adminUser.id
          },
          {
            sequence: 2,
            requiredRole: "MANAGER",
            approverId: managerUser.id
          },
          {
            sequence: 3,
            requiredRole: "DIRECTOR",
            approverId: directorUser.id
          }
        ]
      }
    },
    include: { levels: true }
  });

  console.log("Hirarky Configuration created:", hirarky);
  return { hirarky, adminUser, managerUser, directorUser };
}

export async function assignHirarkyToUser(userId, hirarkyId) {
  console.log(`Assigning Hirarky ${hirarkyId} to User ${userId}`);
  await prisma.user.update({
    where: { id: userId },
    data: { hirarkyId }
  });
}
