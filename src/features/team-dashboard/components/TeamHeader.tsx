"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { TeamInfo } from "../mock/teamDashboardData";
import { TeamSelector } from "./TeamSelector";

type TeamHeaderProps = {
  teamInfo: TeamInfo;
  season: string;
  onSeasonChange: (value: string) => void;
  split: string;
  onSplitChange: (value: string) => void;
  park: string;
  onParkChange: (value: string) => void;
  homeAway: string;
  onHomeAwayChange: (value: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const seasonOptions = ["2025", "2024", "2023", "All Seasons"];
const splitOptions = ["Full Season", "Last 30 Days", "Last 14 Days", "Post-ASB"];
const parkOptions = ["All Parks", "Yankee Stadium", "Fenway Park", "Camden Yards"];
const homeAwayOptions = ["All Games", "Home", "Away"];

/**
 * TeamHeader displays core team identity and quick selector controls.
 */
export function TeamHeader({
  teamInfo,
  season,
  onSeasonChange,
  split,
  onSplitChange,
  park,
  onParkChange,
  homeAway,
  onHomeAwayChange,
  isFavorite,
  onToggleFavorite,
}: TeamHeaderProps) {
  return (
    <Card>
      <CardHeader className="border-none px-6 pb-1 pt-6 md:pb-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
              <Image
                src={teamInfo.teamLogoUrl}
                alt={teamInfo.teamName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {teamInfo.teamName}
                </h1>
                <Badge variant="success">Trending</Badge>
                <Button
                  type="button"
                  onClick={onToggleFavorite}
                  variant="icon"
                  size="sm"
                  className={`h-9 w-9 rounded-full text-lg ${
                    isFavorite ? "text-amber-500" : "text-slate-400"
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Save as favorite"}
                >
                  {isFavorite ? "★" : "☆"}
                </Button>
                {isFavorite ? (
                  <Badge variant="default" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-100">
                    Favorited
                  </Badge>
                ) : null}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {teamInfo.league} · {teamInfo.division}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-6 pb-6">
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <TeamSelector
            currentTeamId={teamInfo.teamId}
            season={season}
            split={split}
          />
          <Select
            label="Season"
            value={season}
            onChange={(event) => onSeasonChange(event.target.value)}
          >
            {seasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            label="Split"
            value={split}
            onChange={(event) => onSplitChange(event.target.value)}
          >
            {splitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            label="Park"
            value={park}
            onChange={(event) => onParkChange(event.target.value)}
          >
            {parkOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            label="Home/Away"
            value={homeAway}
            onChange={(event) => onHomeAwayChange(event.target.value)}
          >
            {homeAwayOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
}
