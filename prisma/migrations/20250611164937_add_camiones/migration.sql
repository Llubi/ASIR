-- CreateTable
CREATE TABLE `Camion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Camion_matricula_key`(`matricula`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
