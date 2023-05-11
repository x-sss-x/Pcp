-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now();
