-- CreateEnum
CREATE TYPE "ShelterType" AS ENUM ('Human', 'Pets', 'Hybrid');

-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "type" "ShelterType" NOT NULL DEFAULT 'Human';
