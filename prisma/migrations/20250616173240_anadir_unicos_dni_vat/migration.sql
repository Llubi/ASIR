/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vat]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_dni_key` ON `Usuario`(`dni`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_vat_key` ON `Usuario`(`vat`);
