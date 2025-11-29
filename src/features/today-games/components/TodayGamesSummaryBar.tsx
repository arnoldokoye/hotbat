import { Card, CardBody } from "@/components/ui/Card";
import { TodayGame } from "../mock/todayGamesData";

type TodayGamesSummaryBarProps = {
  games: TodayGame[];
};

/**
 * TodayGamesSummaryBar shows quick stats about the filtered games.
 */
export function TodayGamesSummaryBar({ games }: TodayGamesSummaryBarProps) {
  const gameCount = games.length;
  const avgParkHrFactor =
    games.length > 0
      ? games.reduce((sum, game) => sum + game.parkHrFactor, 0) / games.length
      : 0;
  const highScoreCount = games.filter((game) => game.hotBatScore >= 70).length;
  const topGame = games.reduce<TodayGame | null>(
    (best, game) => (best === null || game.hotBatScore > best.hotBatScore ? game : best),
    null,
  );

  return (
    <Card>
      <CardBody className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Games" value={gameCount.toString()} />
        <Metric label="Avg Park HR Factor" value={avgParkHrFactor.toFixed(2)} />
        <Metric label="High HotBat (≥70)" value={highScoreCount.toString()} />
        <Metric
          label="Top HR matchup"
          value={topGame ? `${topGame.awayTeam} @ ${topGame.homeTeam}` : "—"}
          subValue={topGame ? `Score: ${topGame.hotBatScore}` : undefined}
        />
      </CardBody>
    </Card>
  );
}

type MetricProps = {
  label: string;
  value: string;
  subValue?: string;
};

function Metric({ label, value, subValue }: MetricProps) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="text-lg font-semibold">{value}</p>
      {subValue ? <p className="text-xs text-slate-500 dark:text-slate-400">{subValue}</p> : null}
    </div>
  );
}
