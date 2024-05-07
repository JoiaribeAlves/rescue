/*
  Warnings:

  - A unique constraint covering the columns `[waterId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "waterId" TEXT;

-- CreateTable
CREATE TABLE "Water" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Water_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_waterId_key" ON "Address"("waterId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_waterId_fkey" FOREIGN KEY ("waterId") REFERENCES "Water"("id") ON DELETE SET NULL ON UPDATE CASCADE;
