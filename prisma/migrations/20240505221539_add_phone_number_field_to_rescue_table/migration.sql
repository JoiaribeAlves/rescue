/*
  Warnings:

  - Added the required column `phoneNumber` to the `Rescue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rescue" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
