import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { TodayGame } from "../mock/todayGamesData";

type TodayGameCardProps = {
  game: TodayGame;
};

/**
 * TodayGameCard renders a single game with HR context.
 */
export function TodayGameCard({ game }: TodayGameCardProps) {
  const hrFriendly = game.parkHrFactor > 1.1;
  return (
    <Card dataTestId="today-game-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <TeamBadge name={game.awayTeam} logoUrl={game.awayTeamLogoUrl} />
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {game.awayTeam} @ {game.homeTeam}
          </div>
          <TeamBadge name={game.homeTeam} logoUrl={game.homeTeamLogoUrl} />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={hrFriendly ? "success" : "default"}>
            Park HR factor {game.parkHrFactor.toFixed(2)}
          </Badge>
          <Badge variant={game.hotBatScore >= 75 ? "success" : game.hotBatScore >= 60 ? "warning" : "default"}>
            HotBat {game.hotBatScore}
          </Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <span>{game.startTimeLocal}</span>
          <span className="text-slate-400">•</span>
          <span>{game.parkName}</span>
        </div>

        <div className="grid gap-2 text-sm text-slate-800 dark:text-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-slate-600 dark:text-slate-300">Projected HR (Away)</span>
            <span className="font-semibold">
              {game.awayProjectedHrMin} – {game.awayProjectedHrMax}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-slate-600 dark:text-slate-300">Projected HR (Home)</span>
            <span className="font-semibold">
              {game.homeProjectedHrMin} – {game.homeProjectedHrMax}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Probable Pitchers
          </p>
          <div className="mt-2 grid gap-2 text-sm">
            <PitcherRow
              label="Away SP"
              name={game.awayStartingPitcher.name}
              throws={game.awayStartingPitcher.throws}
              hrPer9={game.awayStartingPitcher.hrPer9}
              era={game.awayStartingPitcher.era}
            />
            <PitcherRow
              label="Home SP"
              name={game.homeStartingPitcher.name}
              throws={game.homeStartingPitcher.throws}
              hrPer9={game.homeStartingPitcher.hrPer9}
              era={game.homeStartingPitcher.era}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

type PitcherRowProps = {
  label: string;
  name: string;
  throws: "L" | "R";
  hrPer9: number;
  era: number;
};

function PitcherRow({ label, name, throws, hrPer9, era }: PitcherRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          {label}
        </Badge>
        <span className="font-semibold">{name}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Throws {throws}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span>HR/9 {hrPer9.toFixed(2)}</span>
        <span className="text-slate-400">•</span>
        <span>ERA {era.toFixed(2)}</span>
      </div>
    </div>
  );
}

type TeamBadgeProps = {
  name: string;
  logoUrl?: string;
};

function TeamBadge({ name, logoUrl }: TeamBadgeProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logoUrl) {
    return (
      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
        <Image
          src={logoUrl}
          alt={name}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
      {initials}
    </div>
  );
}
