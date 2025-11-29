"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { PitchDamageRow } from "../mock/playerDashboardData";

type SortKey = "hr" | "avgEv" | "hrPer100Pitches";

type PlayerPitchDamageCardProps = {
  rows: PitchDamageRow[];
};

/**
 * PlayerPitchDamageCard highlights HR damage by pitch type with sorting.
 */
export function PlayerPitchDamageCard({ rows }: PlayerPitchDamageCardProps) {
  const [sortBy, setSortBy] = useState<SortKey>("hr");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA === valueB) return 0;
      const base = valueA < valueB ? -1 : 1;
      return sortDirection === "asc" ? base : -base;
    });
  }, [rows, sortBy, sortDirection]);

  const handleSortChange = (key: SortKey) => {
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
            Damage by Pitch Type
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            HR impact and quality of contact by pitch category
          </p>
        </div>
        <Select
          value={sortBy}
          onChange={(event) => handleSortChange(event.target.value as SortKey)}
          className="w-40"
        >
          <option value="hr">HR</option>
          <option value="hrPer100Pitches">HR / 100 Pitches</option>
          <option value="avgEv">Avg EV</option>
        </Select>
      </CardHeader>
      <CardBody>
        <Table>
          <Thead>
            <Tr>
              <Th>Pitch</Th>
              <Th>HR</Th>
              <Th>HR / 100 P</Th>
              <Th>Avg EV</Th>
              <Th>Max Dist</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedRows.map((row) => (
              <Tr key={row.pitchType}>
                <Td className="font-semibold text-slate-900 dark:text-slate-50">{row.pitchType}</Td>
                <Td className="text-slate-800 dark:text-slate-200">{row.hr.toFixed(0)}</Td>
                <Td className="text-slate-800 dark:text-slate-200">
                  {row.hrPer100Pitches.toFixed(1)}
                </Td>
                <Td className="text-slate-800 dark:text-slate-200">{row.avgEv.toFixed(1)} mph</Td>
                <Td className="text-slate-800 dark:text-slate-200">{row.maxDistance.toFixed(0)} ft</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
