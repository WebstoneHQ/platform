-- CreateTable
CREATE TABLE "preorders" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "form_discord_username" TEXT NOT NULL,
    "form_email" TEXT NOT NULL,
    "form_github_username" TEXT NOT NULL,
    "form_license_key" TEXT NOT NULL,
    "gumroad_license_verification" JSONB NOT NULL,

    CONSTRAINT "preorders_pkey" PRIMARY KEY ("id")
);
