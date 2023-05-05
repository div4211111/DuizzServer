/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];
