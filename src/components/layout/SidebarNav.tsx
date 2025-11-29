export const navSections = [
  {
    title: "Teams",
    links: ["Dashboards", "Trends", "Comparisons"],
  },
  {
    title: "Today’s Games",
    links: ["Matchups", "Weather", "Ballpark Factors"],
  },
  {
    title: "Players",
    links: ["Leaderboards", "Projections", "Alerts"],
  },
  {
    title: "Tools",
    links: ["Custom Reports", "Export", "Settings"],
  },
];

export function SidebarNav() {
  return (
    <aside className="hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block md:min-w-[240px] md:border-b-0 md:border-r">
      <div className="mx-auto flex w-full max-w-7xl flex-row gap-6 overflow-x-auto px-4 py-4 md:mx-0 md:flex-col md:gap-3 md:overflow-visible md:px-6 md:py-6">
        {navSections.map((section) => (
          <div key={section.title} className="min-w-[180px] md:min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {section.title}
            </p>
            <ul className="mt-2 space-y-1">
              {section.links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <span>{link}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
