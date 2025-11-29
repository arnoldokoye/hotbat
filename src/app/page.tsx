import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Welcome
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">
          HotBat Analytics
        </h1>
        <p className="text-sm text-slate-600">
          Start exploring the Team HR Dashboard to review performance trends,
          upcoming matchups, and park factors.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/team"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Team Dashboard
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Quick Actions
          </button>
        </div>
      </div>
    </section>
  );
}
