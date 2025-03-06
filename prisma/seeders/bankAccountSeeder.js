import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedBankAccounts(user1, user2) {
  console.log("Seeding Bank Accounts...");
  await prisma.bankAccount.create({
    data: {
      idUser: user1.id,
      name: "User1 Bank Account",
      bankName: "Bank A",
      number: "111222333"
    }
  });
  await prisma.bankAccount.create({
    data: {
      idUser: user2.id,
      name: "User2 Bank Account",
      bankName: "Bank B",
      number: "444555666"
    }
  });
}
