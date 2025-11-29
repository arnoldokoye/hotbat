"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { Select } from "@/components/ui/Select";
import { navSections } from "./SidebarNav";

const seasons = ["2025", "2024", "2023"];

export function TopNav() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("hotbat-theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ?? (prefersDark ? "dark" : "light");
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("hotbat-theme", theme);
  }, [theme]);

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <PageContainer className="flex h-14 items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 md:hidden"
            aria-label="Open navigation"
            onClick={() => setIsMobileNavOpen(true)}
          >
            ☰
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            HB
          </div>
          <div className="leading-tight">
            <Link
              href="/"
              className="text-base font-semibold text-slate-900 dark:text-slate-50"
            >
              HotBat
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Team HR insights
            </p>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <label className="sr-only" htmlFor="season-select">
            Season
          </label>
          <Select
            id="season-select"
            defaultValue={seasons[0]}
            className="min-w-[8rem]"
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                Season {season}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="hidden md:inline-flex"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
          <Button
            type="button"
            variant="icon"
            size="sm"
            aria-label="Toggle theme"
            className="md:hidden"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "☀" : "☾"}
          </Button>
          <Button
            type="button"
            variant="icon"
            size="sm"
            aria-label="User menu"
            className="h-9 w-9 rounded-full"
          >
            AL
          </Button>
        </div>
      </PageContainer>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 border-r border-slate-800 bg-slate-900 px-4 py-4 text-slate-100 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Navigation</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-4">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {section.title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {section.links.map((link) => (
                      <li key={link}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
                        >
                          <span>{link}</span>
                          <span className="text-[10px] text-slate-500">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
