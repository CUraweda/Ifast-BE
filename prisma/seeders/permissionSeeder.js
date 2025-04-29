import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedPermissions() {
  console.log("Seeding Permissions...");
  
  // Create permissions for each role type
  const permissions = [
    {
      name: "Admin Full Access",
      description: "Full access permission for Admin role"
    },
    {
      name: "Manager Access",
      description: "Manager level access permission"
    },
    {   
      name: "Director Access",
      description: "Director level access permission"
    }
  ];

  // Get all roles
  const roles = await prisma.roles.findMany();
  
  // Create permissions and link them to roles
  for (const role of roles) {
    const permissionData = permissions.find(p => p.code.includes(role.code));
    if (permissionData) {
      await prisma.permission.create({
        data: {
          ...permissionData,
          roleId: role.id
        }
      });
    }
  }

  console.log("Permissions seeded successfully");
} 