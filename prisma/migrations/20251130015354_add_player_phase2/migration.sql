-- CreateEnum
CREATE TYPE "Bats" AS ENUM ('L', 'R', 'S');

-- CreateEnum
CREATE TYPE "HomeAway" AS ENUM ('home', 'away');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bats" "Bats" NOT NULL,
    "position" TEXT NOT NULL,
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "mlbId" TEXT,
    "statcastId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerGameStats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homeOrAway" "HomeAway" NOT NULL,
    "matchupHand" "Bats" NOT NULL,
    "parkId" INTEGER NOT NULL,
    "pa" INTEGER NOT NULL,
    "hr" INTEGER NOT NULL,
    "xHr" DOUBLE PRECISION,
    "avgEv" DOUBLE PRECISION,
    "barrels" INTEGER,
    "barrelRate" DOUBLE PRECISION,
    "hardHitRate" DOUBLE PRECISION,
    "iso" DOUBLE PRECISION,
    "woba" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerGameStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerHrSummary" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "splitKey" TEXT NOT NULL,
    "gamesPlayed" INTEGER NOT NULL,
    "pa" INTEGER,
    "hr" INTEGER NOT NULL,
    "xHr" DOUBLE PRECISION,
    "hrPerPa" DOUBLE PRECISION,
    "barrelRate" DOUBLE PRECISION,
    "avgEv" DOUBLE PRECISION,
    "hardHitRate" DOUBLE PRECISION,
    "iso" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerHrSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_mlbId_key" ON "Player"("mlbId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_statcastId_key" ON "Player"("statcastId");

-- CreateIndex
CREATE INDEX "Player_teamId_idx" ON "Player"("teamId");

-- CreateIndex
CREATE INDEX "Player_lastName_firstName_teamId_idx" ON "Player"("lastName", "firstName", "teamId");

-- CreateIndex
CREATE INDEX "PlayerGameStats_playerId_season_idx" ON "PlayerGameStats"("playerId", "season");

-- CreateIndex
CREATE INDEX "PlayerGameStats_playerId_matchupHand_idx" ON "PlayerGameStats"("playerId", "matchupHand");

-- CreateIndex
CREATE INDEX "PlayerGameStats_playerId_homeOrAway_idx" ON "PlayerGameStats"("playerId", "homeOrAway");

-- CreateIndex
CREATE INDEX "PlayerGameStats_playerId_parkId_idx" ON "PlayerGameStats"("playerId", "parkId");

-- CreateIndex
CREATE INDEX "PlayerGameStats_teamId_season_idx" ON "PlayerGameStats"("teamId", "season");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerGameStats_playerId_gameId_key" ON "PlayerGameStats"("playerId", "gameId");

-- CreateIndex
CREATE INDEX "PlayerHrSummary_playerId_splitKey_idx" ON "PlayerHrSummary"("playerId", "splitKey");

-- CreateIndex
CREATE INDEX "PlayerHrSummary_season_splitKey_idx" ON "PlayerHrSummary"("season", "splitKey");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerHrSummary_playerId_season_splitKey_key" ON "PlayerHrSummary"("playerId", "season", "splitKey");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGameStats" ADD CONSTRAINT "PlayerGameStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGameStats" ADD CONSTRAINT "PlayerGameStats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGameStats" ADD CONSTRAINT "PlayerGameStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGameStats" ADD CONSTRAINT "PlayerGameStats_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerHrSummary" ADD CONSTRAINT "PlayerHrSummary_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
