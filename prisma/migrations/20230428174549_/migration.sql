/*
  Warnings:

  - You are about to drop the `database` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `database`;

-- CreateTable
CREATE TABLE `db` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `situacao` VARCHAR(191) NULL DEFAULT 'AGUARDANDO',
    `dataCriado` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
