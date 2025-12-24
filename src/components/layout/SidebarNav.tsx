"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

type NavLink = { label: string; href?: string };

export const navSections: { title: string; links: NavLink[] }[] = [
  {
    title: "Teams",
    links: [
      { label: "Dashboards", href: "/team" },
      { label: "Trends" },
      { label: "Comparisons" },
    ],
  },
  {
    title: "Today’s Games",
    links: [
      { label: "Today’s Games", href: "/today" },
      { label: "Matchups" },
      { label: "Weather" },
      { label: "Ballpark Factors" },
    ],
  },
  {
    title: "Players",
    links: [
      { label: "Player HR Dashboard", href: "/player" },
      { label: "HR Picks", href: "/picks" },
      { label: "Leaderboards" },
      { label: "Projections" },
      { label: "Alerts" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Custom Reports" },
      { label: "Export" },
      { label: "Settings" },
    ],
  },
];

export function SidebarNav() {
  const { favoriteTeams, favoritePlayers } = useFavorites();
  const teamsLabel =
    favoriteTeams.length > 0 ? `Teams ★ (${favoriteTeams.length})` : "Teams";
  const playersLabel =
    favoritePlayers.length > 0 ? `Players ★ (${favoritePlayers.length})` : "Players";

  return (
    <aside className="hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block md:min-w-[240px] md:border-b-0 md:border-r">
      <div className="mx-auto flex w-full max-w-7xl flex-row gap-6 overflow-x-auto px-4 py-4 md:mx-0 md:flex-col md:gap-3 md:overflow-visible md:px-6 md:py-6">
        {navSections.map((section) => {
          const title =
            section.title === "Teams"
              ? teamsLabel
              : section.title === "Players"
              ? playersLabel
              : section.title;
          return (
          <div key={section.title} className="min-w-[180px] md:min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {title}
            </p>
            <ul className="mt-2 space-y-1">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">→</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">→</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
        })}
      </div>
    </aside>
  );
}
