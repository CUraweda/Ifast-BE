/*
  Warnings:

  - You are about to drop the `_permissiontoroles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_permissiontoroles` DROP FOREIGN KEY `_PermissionToRoles_A_fkey`;

-- DropForeignKey
ALTER TABLE `_permissiontoroles` DROP FOREIGN KEY `_PermissionToRoles_B_fkey`;

-- AlterTable
ALTER TABLE `permission` ADD COLUMN `roleId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_permissiontoroles`;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_roleId_key` ON `Permission`(`roleId`);

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
