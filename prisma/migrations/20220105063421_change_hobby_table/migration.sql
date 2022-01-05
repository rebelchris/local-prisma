/*
  Warnings:

  - You are about to drop the column `title` on the `Hobby` table. All the data in the column will be lost.
  - Added the required column `name` to the `Hobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hobby" RENAME COLUMN "title" TO "name";
ALTER TABLE "Hobby" ADD COLUMN     "rank" INTEGER;