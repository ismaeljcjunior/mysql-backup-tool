-- CreateTable
CREATE TABLE `database` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `situacao` VARCHAR(191) NULL DEFAULT 'AGUARDANDO',
    `nomeDestino` VARCHAR(191) NULL,
    `dataRealizado` DATETIME(3) NULL,
    `dataCriado` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `databasebackup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
