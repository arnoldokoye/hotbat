import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { UpcomingGame } from "../mock/teamDashboardData";

type UpcomingGamesCardProps = {
  games: UpcomingGame[];
};

export function UpcomingGamesCard({ games }: UpcomingGamesCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Upcoming Games / Series
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Projected HR ranges for the next set
          </p>
        </div>
        <Select className="w-40">
          <option>Next 7 days</option>
          <option>Next 14 days</option>
          <option>Next 30 days</option>
        </Select>
      </CardHeader>

      <CardBody className="space-y-3">
        {games.map((game) => (
          <div
            key={`${game.date}-${game.opponentName}`}
            className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <OpponentBadge name={game.opponentName} logoUrl={game.opponentLogoUrl} />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {game.opponentName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {formatDate(game.date)} • {game.parkName}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
              <Badge className="bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                Park HR factor: {game.parkHrFactor.toFixed(2)}
              </Badge>
              <Badge className="bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                Projected HR range: {game.projectedHrMin}–{game.projectedHrMax}
              </Badge>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

type OpponentBadgeProps = {
  name: string;
  logoUrl?: string;
};

function OpponentBadge({ name, logoUrl }: OpponentBadgeProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logoUrl) {
    return (
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
        <Image
          src={logoUrl}
          alt={name}
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
      {initials}
    </div>
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
