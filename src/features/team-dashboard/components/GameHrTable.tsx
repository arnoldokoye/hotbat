import { useMemo, useState } from "react";
import { GameRow } from "../mock/teamDashboardData";

type SortKey = keyof Pick<
  GameRow,
  "date" | "opponent" | "park" | "hr" | "xHr" | "hrDiff" | "opposingSp" | "opposingSpHr9"
>;

type GameHrTableProps = {
  rows: GameRow[];
};

export function GameHrTable({ rows }: GameHrTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter(
      (row) =>
        row.opponent.toLowerCase().includes(query) ||
        row.park.toLowerCase().includes(query),
    );
  }, [rows, searchQuery]);

  const sortedRows = useMemo(() => {
    const sorted = [...filteredRows].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue === bValue) return 0;
      const base = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? base : -base;
    });
    return sorted;
  }, [filteredRows, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sortedRows.slice(start, start + pageSize);

  const handleSort = (key: SortKey) => {
    if (key === sortBy) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setPage((prev) => {
      if (direction === "prev") return Math.max(1, prev - 1);
      return Math.min(totalPages, prev + 1);
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Game-Level HR View
          </p>
          <p className="text-sm text-slate-600">Search, sort, and page through recent games</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search opponent or park"
            className="h-10 w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
          />
          <button
            type="button"
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            Columns
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              {[
                { key: "date", label: "Date" },
                { key: "opponent", label: "Opponent" },
                { key: "park", label: "Park" },
                { key: "result", label: "Result" },
                { key: "hr", label: "HR" },
                { key: "xHr", label: "xHR" },
                { key: "hrDiff", label: "HR diff" },
                { key: "opposingSp", label: "Opposing SP" },
                { key: "opposingSpHr9", label: "SP HR/9" },
              ].map(({ key, label }) => (
                <th key={key} className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => handleSort(key as SortKey)}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {label}
                    {sortBy === key ? (
                      <span aria-hidden className="text-[10px]">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    ) : (
                      <span aria-hidden className="text-[10px] text-slate-300">▲</span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-2 text-slate-800">{row.date}</td>
                <td className="px-3 py-2 font-semibold text-slate-900">{row.opponent}</td>
                <td className="px-3 py-2 text-slate-700">{row.park}</td>
                <td className="px-3 py-2 text-slate-700">{row.result}</td>
                <td className="px-3 py-2 text-slate-900">{row.hr.toFixed(0)}</td>
                <td className="px-3 py-2 text-slate-700">{row.xHr.toFixed(1)}</td>
                <td className="px-3 py-2 text-slate-700">{row.hrDiff.toFixed(1)}</td>
                <td className="px-3 py-2 text-slate-700">{row.opposingSp}</td>
                <td className="px-3 py-2 text-slate-700">{row.opposingSpHr9.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
          >
            {[10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-xs font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
