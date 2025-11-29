"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { GameRow } from "../mock/teamDashboardData";

type SortKey = keyof Pick<
  GameRow,
  "date" | "opponent" | "park" | "result" | "hr" | "xHr" | "hrDiff" | "opposingSp" | "opposingSpHr9"
>;

type GameHrTableProps = {
  rows: GameRow[];
};

/**
 * GameHrTable renders a sortable, filterable table of game-level HR data.
 */
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
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Game-Level HR View
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Search, sort, and page through recent games
          </p>
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
            className="h-10 w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
          <Button type="button" size="sm" variant="secondary">
            Columns
          </Button>
        </div>
      </CardHeader>

      <CardBody>
        <Table>
          <Thead>
            <Tr>
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
                <Th key={key}>
                  <button
                    type="button"
                    onClick={() => handleSort(key as SortKey)}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
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
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {pageRows.map((row) => (
              <Tr key={row.id}>
                <Td className="text-slate-800 dark:text-slate-200">{row.date}</Td>
                <Td className="font-semibold text-slate-900 dark:text-slate-50">{row.opponent}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.park}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.result}</Td>
                <Td className="text-slate-900 dark:text-slate-50">{row.hr.toFixed(0)}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.xHr.toFixed(1)}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.hrDiff.toFixed(1)}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.opposingSp}</Td>
                <Td className="text-slate-700 dark:text-slate-200">
                  {row.opposingSpHr9.toFixed(2)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>

      <CardBody className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Rows per page</span>
          <Select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="h-9 w-20"
          >
            {[10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            variant="secondary"
            size="sm"
          >
            Prev
          </Button>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            variant="secondary"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
