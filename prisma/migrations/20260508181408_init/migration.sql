-- CreateTable
CREATE TABLE `Card` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `priceValue` DOUBLE NOT NULL,
    `rarity` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `expansion` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
