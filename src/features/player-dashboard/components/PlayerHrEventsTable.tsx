"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { PlayerHrEventRow } from "../mock/playerDashboardData";

type SortKey = "distance" | "ev" | "date";

type PlayerHrEventsTableProps = {
  rows: PlayerHrEventRow[];
};

/**
 * PlayerHrEventsTable lists individual HR events with sorting and search.
 */
export function PlayerHrEventsTable({ rows }: PlayerHrEventsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("distance");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter(
      (row) =>
        row.opponent.toLowerCase().includes(query) ||
        row.park.toLowerCase().includes(query) ||
        row.pitchType.toLowerCase().includes(query),
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
      setSortDirection("desc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Home Run Events
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Distance, EV, and pitch details for each HR
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
            placeholder="Search opponent, park, or pitch"
            className="h-10 w-64 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
          <Select
            value={sortBy}
            onChange={(event) => handleSort(event.target.value as SortKey)}
            className="w-40"
          >
            <option value="distance">Distance</option>
            <option value="ev">Exit Velocity</option>
            <option value="date">Date</option>
          </Select>
        </div>
      </CardHeader>

      <CardBody>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Opponent</Th>
              <Th>Park</Th>
              <Th>Inning</Th>
              <Th>Pitch</Th>
              <Th>Velo</Th>
              <Th>Distance</Th>
              <Th>EV</Th>
              <Th>LA</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageRows.map((row) => (
              <Tr key={row.id}>
                <Td className="text-slate-800 dark:text-slate-200">{row.date}</Td>
                <Td className="font-semibold text-slate-900 dark:text-slate-50">{row.opponent}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.park}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.inning}</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.pitchType}</Td>
                <Td className="text-slate-800 dark:text-slate-200">
                  {row.pitchVelocity.toFixed(1)} mph
                </Td>
                <Td className="text-slate-900 dark:text-slate-50">{row.distance.toFixed(0)} ft</Td>
                <Td className="text-slate-900 dark:text-slate-50">{row.ev.toFixed(1)} mph</Td>
                <Td className="text-slate-700 dark:text-slate-200">{row.launchAngle}°</Td>
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
            {[8, 12, 16].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
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
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
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
