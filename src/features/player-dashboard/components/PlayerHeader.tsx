"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { PlayerInfo } from "../mock/playerDashboardData";

type PlayerHeaderProps = {
  playerInfo: PlayerInfo;
  season: string;
  onSeasonChange: (value: string) => void;
  split: string;
  onSplitChange: (value: string) => void;
};

const seasonOptions = ["2025", "2024", "2023", "Career"];
const splitOptions = ["Full Season", "Last 30 Days", "Last 14 Days", "Post-ASB"];

/**
 * PlayerHeader shows core player identity and quick selectors.
 */
export function PlayerHeader({
  playerInfo,
  season,
  onSeasonChange,
  split,
  onSplitChange,
}: PlayerHeaderProps) {
  const initials = playerInfo.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="border-none px-6 pb-1 pt-6 md:pb-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
              {playerInfo.teamLogoUrl ? (
                <Image
                  src={playerInfo.teamLogoUrl}
                  alt={playerInfo.teamName}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {playerInfo.name}
                </h1>
                <Badge variant="success">{playerInfo.position}</Badge>
                <Badge variant="default">
                  B/T: {playerInfo.bats}/{playerInfo.throws}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {playerInfo.teamName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              Follow
            </Button>
            <Button variant="primary" size="sm">
              Favorite
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-6 pb-6">
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </CardBody>
    </Card>
  );
}
