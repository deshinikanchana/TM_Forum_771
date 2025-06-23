-- CreateTable
CREATE TABLE `ResourceUsageSpecification` (
    `id` VARCHAR(191) NOT NULL,
    `href` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `isBundle` BOOLEAN NOT NULL DEFAULT false,
    `lifecycleStatus` VARCHAR(191) NOT NULL,
    `lastUpdate` DATETIME(3) NULL,
    `validForStart` DATETIME(3) NULL,
    `validForEnd` DATETIME(3) NULL,
    `@baseType` VARCHAR(191) NULL,
    `@type` VARCHAR(191) NULL,
    `schemaLocation` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacteristicSpecification` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `valueType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `configurable` BOOLEAN NOT NULL,
    `extensible` BOOLEAN NULL,
    `isUnique` BOOLEAN NULL,
    `minCardinality` INTEGER NOT NULL,
    `maxCardinality` INTEGER NOT NULL,
    `resourceUsageSpecId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResourceUsage` (
    `id` VARCHAR(191) NOT NULL,
    `href` VARCHAR(191) NULL,
    `usageDate` DATETIME(3) NOT NULL,
    `usageType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isBundle` BOOLEAN NOT NULL DEFAULT false,
    `usageSpecificationId` VARCHAR(191) NULL,
    `resourceId` VARCHAR(191) NOT NULL,
    `resourceName` VARCHAR(191) NOT NULL,
    `bundledResourceUsageId` VARCHAR(191) NULL,
    `@baseType` VARCHAR(191) NULL,
    `@type` VARCHAR(191) NULL,
    `schemaLocation` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsageCharacteristic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `valueType` VARCHAR(191) NOT NULL,
    `@type` VARCHAR(191) NULL,
    `@baseType` VARCHAR(191) NULL,
    `schemaLocation` VARCHAR(191) NULL,
    `resourceUsageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatedParty` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `partyId` VARCHAR(191) NULL,
    `partyName` VARCHAR(191) NULL,
    `@type` VARCHAR(191) NULL,
    `@baseType` VARCHAR(191) NULL,
    `schemaLocation` VARCHAR(191) NULL,
    `resourceUsageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExternalIdentifier` (
    `id` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `externalIdentifierType` VARCHAR(191) NOT NULL,
    `@type` VARCHAR(191) NULL,
    `@baseType` VARCHAR(191) NULL,
    `schemaLocation` VARCHAR(191) NULL,
    `resourceUsageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CharacteristicSpecification` ADD CONSTRAINT `CharacteristicSpecification_resourceUsageSpecId_fkey` FOREIGN KEY (`resourceUsageSpecId`) REFERENCES `ResourceUsageSpecification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResourceUsage` ADD CONSTRAINT `ResourceUsage_usageSpecificationId_fkey` FOREIGN KEY (`usageSpecificationId`) REFERENCES `ResourceUsageSpecification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResourceUsage` ADD CONSTRAINT `ResourceUsage_bundledResourceUsageId_fkey` FOREIGN KEY (`bundledResourceUsageId`) REFERENCES `ResourceUsage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageCharacteristic` ADD CONSTRAINT `UsageCharacteristic_resourceUsageId_fkey` FOREIGN KEY (`resourceUsageId`) REFERENCES `ResourceUsage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedParty` ADD CONSTRAINT `RelatedParty_resourceUsageId_fkey` FOREIGN KEY (`resourceUsageId`) REFERENCES `ResourceUsage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExternalIdentifier` ADD CONSTRAINT `ExternalIdentifier_resourceUsageId_fkey` FOREIGN KEY (`resourceUsageId`) REFERENCES `ResourceUsage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
