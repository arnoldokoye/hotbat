import Image from "next/image";
import { UpcomingGame } from "../mock/teamDashboardData";

type UpcomingGamesCardProps = {
  games: UpcomingGame[];
};

export function UpcomingGamesCard({ games }: UpcomingGamesCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Upcoming Games / Series
          </p>
          <p className="text-sm text-slate-600">Projected HR ranges for the next set</p>
        </div>
        <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none">
          <option>Next 7 days</option>
          <option>Next 14 days</option>
          <option>Next 30 days</option>
        </select>
      </div>

      <div className="mt-4 space-y-3">
        {games.map((game) => (
          <div
            key={`${game.date}-${game.opponentName}`}
            className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <OpponentBadge name={game.opponentName} logoUrl={game.opponentLogoUrl} />
              <div>
                <p className="text-sm font-semibold text-slate-900">{game.opponentName}</p>
                <p className="text-xs text-slate-600">
                  {formatDate(game.date)} • {game.parkName}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                Park HR factor: {game.parkHrFactor.toFixed(2)}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                Projected HR range: {game.projectedHrMin}–{game.projectedHrMax}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm">
      {initials}
    </div>
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
