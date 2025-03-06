-- AlterTable
ALTER TABLE `user` ADD COLUMN `hirarkyId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Hirarky` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HirarkyLevel` (
    `id` VARCHAR(191) NOT NULL,
    `hirarkyId` VARCHAR(191) NOT NULL,
    `sequence` INTEGER NOT NULL,
    `requiredRole` VARCHAR(191) NOT NULL,
    `approverId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hirarkyId_fkey` FOREIGN KEY (`hirarkyId`) REFERENCES `Hirarky`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HirarkyLevel` ADD CONSTRAINT `HirarkyLevel_hirarkyId_fkey` FOREIGN KEY (`hirarkyId`) REFERENCES `Hirarky`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HirarkyLevel` ADD CONSTRAINT `HirarkyLevel_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
