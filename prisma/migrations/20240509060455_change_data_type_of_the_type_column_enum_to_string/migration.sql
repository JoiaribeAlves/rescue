/*
  Warnings:

  - The `type` column on the `Shelter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'People';

-- DropEnum
DROP TYPE "ShelterType";
