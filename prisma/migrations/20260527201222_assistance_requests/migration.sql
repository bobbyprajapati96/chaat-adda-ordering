-- CreateTable
CREATE TABLE "AssistanceRequest" (
    "id" SERIAL NOT NULL,
    "tableNo" INTEGER NOT NULL,
    "request" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistanceRequest_pkey" PRIMARY KEY ("id")
);
