/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categories_title_key" ON "Categories"("title");
