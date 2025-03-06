-- AlterTable
ALTER TABLE `submission` ADD COLUMN `typeId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `submission` ADD CONSTRAINT `submission_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `typeSubmission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
