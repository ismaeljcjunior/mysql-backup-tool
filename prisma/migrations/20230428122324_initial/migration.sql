-- CreateTable
CREATE TABLE `database` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `situacao` VARCHAR(191) NULL,
    `nomeDestino` VARCHAR(191) NULL,
    `dataRealizado` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
