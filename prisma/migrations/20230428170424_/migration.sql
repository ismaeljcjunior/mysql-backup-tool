/*
  Warnings:

  - You are about to drop the column `nomeDestino` on the `database` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `database` DROP COLUMN `nomeDestino`;

-- AlterTable
ALTER TABLE `databasebackup` ADD COLUMN `dataCriado` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dataRealizado` DATETIME(3) NULL,
    ADD COLUMN `nome` VARCHAR(191) NULL,
    ADD COLUMN `nomeDestino` VARCHAR(191) NULL;
