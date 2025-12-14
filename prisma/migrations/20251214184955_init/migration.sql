-- CreateTable
CREATE TABLE "buildathon_registrations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamMembers" TEXT NOT NULL,
    "githubRepo" TEXT,
    "karmaGapLink" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "buildathon_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "buildathon_registrations_createdAt_idx" ON "buildathon_registrations"("createdAt");
