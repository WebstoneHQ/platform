-- CreateTable
CREATE TABLE "curriculums" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "email" TEXT,
    "web" TEXT,
    "styles" TEXT,
    "apitype" TEXT,
    "api" TEXT,
    "database" TEXT,

    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("id")
);
