-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now();

-- CreateTable
CREATE TABLE "_upload posts" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upload posts_AB_unique" ON "_upload posts"("A", "B");

-- CreateIndex
CREATE INDEX "_upload posts_B_index" ON "_upload posts"("B");

-- AddForeignKey
ALTER TABLE "_upload posts" ADD CONSTRAINT "_upload posts_A_fkey" FOREIGN KEY ("A") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upload posts" ADD CONSTRAINT "_upload posts_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
