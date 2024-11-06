-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "ip" TEXT,
    "city" TEXT,
    "country" TEXT,
    "region" TEXT,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);
