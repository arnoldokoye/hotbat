import Link from "next/link";

const seasons = ["2025", "2024", "2023"];

export function TopNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            HB
          </div>
          <div className="leading-tight">
            <Link href="/" className="text-base font-semibold text-slate-900">
              HotBat
            </Link>
            <p className="text-xs text-slate-500">Team HR insights</p>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <label className="sr-only" htmlFor="season-select">
            Season
          </label>
          <select
            id="season-select"
            className="h-10 min-w-[7rem] rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm"
            defaultValue={seasons[0]}
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                Season {season}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
          >
            Theme
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm"
            aria-label="User menu"
          >
            AL
          </button>
        </div>
      </div>
    </header>
  );
}
