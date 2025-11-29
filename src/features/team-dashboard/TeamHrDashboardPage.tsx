export function TeamHrDashboardPage() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Overview
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Team HR Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Quick entry point for the team&apos;s HR analytics. Filters, trend
            cards, and tables will live here as we flesh out the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
