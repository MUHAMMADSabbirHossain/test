/*
  Warnings:

  - You are about to drop the column `slug` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userRoleId` on the `users` table. All the data in the column will be lost.
  - Added the required column `hashed_password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('review', 'invalid', 'active', 'inactive', 'deleted', 'suspended', 'banned');

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_userRoleId_fkey";

-- DropIndex
DROP INDEX "public"."users_slug_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "slug",
DROP COLUMN "userRoleId",
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "user_role_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
