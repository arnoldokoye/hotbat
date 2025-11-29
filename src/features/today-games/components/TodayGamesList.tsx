import { TodayGame } from "../mock/todayGamesData";
import { TodayGameCard } from "./TodayGameCard";

type TodayGamesListProps = {
  games: TodayGame[];
};

/**
 * TodayGamesList renders a responsive grid of game cards.
 */
export function TodayGamesList({ games }: TodayGamesListProps) {
  if (games.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
        No games matching filters.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <TodayGameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
