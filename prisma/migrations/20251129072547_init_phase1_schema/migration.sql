-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryParkId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Park" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "defaultHrFactor" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Park_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "mlbGameId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "parkId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamGameHrStats" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "opponentTeamId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homeOrAway" TEXT NOT NULL,
    "parkId" INTEGER NOT NULL,
    "hr" INTEGER NOT NULL,
    "xHr" DOUBLE PRECISION,
    "avgEv" DOUBLE PRECISION,
    "barrels" INTEGER,
    "barrelRate" DOUBLE PRECISION,
    "pa" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamGameHrStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamHrSummary" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "fromDate" TIMESTAMP(3),
    "toDate" TIMESTAMP(3),
    "splitKey" TEXT NOT NULL,
    "gamesPlayed" INTEGER NOT NULL,
    "hr" INTEGER NOT NULL,
    "xHr" DOUBLE PRECISION,
    "hrPerGame" DOUBLE PRECISION NOT NULL,
    "hrPerPa" DOUBLE PRECISION,
    "hrVsLeaguePct" DOUBLE PRECISION,
    "avgEv" DOUBLE PRECISION,
    "barrelRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamHrSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkHrFactor" (
    "id" SERIAL NOT NULL,
    "parkId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "hrFactor" DOUBLE PRECISION NOT NULL,
    "hrFactorVsLhp" DOUBLE PRECISION,
    "hrFactorVsRhp" DOUBLE PRECISION,
    "samples" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkHrFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHrPrediction" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "predictionTimestamp" TIMESTAMP(3) NOT NULL,
    "predictedHrMean" DOUBLE PRECISION NOT NULL,
    "predictedHrStd" DOUBLE PRECISION,
    "hotbatScore" DOUBLE PRECISION NOT NULL,
    "labelType" TEXT NOT NULL,
    "featuresSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameHrPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Game_date_idx" ON "Game"("date");

-- CreateIndex
CREATE INDEX "TeamGameHrStats_teamId_date_idx" ON "TeamGameHrStats"("teamId", "date");

-- CreateIndex
CREATE INDEX "TeamGameHrStats_gameId_idx" ON "TeamGameHrStats"("gameId");

-- CreateIndex
CREATE INDEX "TeamHrSummary_teamId_season_splitKey_idx" ON "TeamHrSummary"("teamId", "season", "splitKey");

-- CreateIndex
CREATE INDEX "ParkHrFactor_parkId_season_idx" ON "ParkHrFactor"("parkId", "season");

-- CreateIndex
CREATE INDEX "GameHrPrediction_gameId_teamId_idx" ON "GameHrPrediction"("gameId", "teamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_primaryParkId_fkey" FOREIGN KEY ("primaryParkId") REFERENCES "Park"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGameHrStats" ADD CONSTRAINT "TeamGameHrStats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGameHrStats" ADD CONSTRAINT "TeamGameHrStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGameHrStats" ADD CONSTRAINT "TeamGameHrStats_opponentTeamId_fkey" FOREIGN KEY ("opponentTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGameHrStats" ADD CONSTRAINT "TeamGameHrStats_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamHrSummary" ADD CONSTRAINT "TeamHrSummary_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkHrFactor" ADD CONSTRAINT "ParkHrFactor_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHrPrediction" ADD CONSTRAINT "GameHrPrediction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHrPrediction" ADD CONSTRAINT "GameHrPrediction_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
