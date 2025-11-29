"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { ParkProfileRow } from "../mock/playerDashboardData";

type PlayerParkProfileCardProps = {
  rows: ParkProfileRow[];
};

/**
 * PlayerParkProfileCard outlines HR performance by ballpark.
 */
export function PlayerParkProfileCard({ rows }: PlayerParkProfileCardProps) {
  const sorted = [...rows].sort((a, b) => b.hrAtPark - a.hrAtPark);
  const topFactor = Math.max(...rows.map((row) => row.parkHrFactor));

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Park HR Profile
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Park factors and home run distribution
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Table>
          <Thead>
            <Tr>
              <Th>Park</Th>
              <Th>HR</Th>
              <Th>HR/PA</Th>
              <Th>HR Factor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sorted.map((row) => (
              <Tr key={row.parkName}>
                <Td className="font-semibold text-slate-900 dark:text-slate-50">{row.parkName}</Td>
                <Td className="text-slate-800 dark:text-slate-200">{row.hrAtPark}</Td>
                <Td className="text-slate-800 dark:text-slate-200">{row.hrPerPaAtPark.toFixed(3)}</Td>
                <Td className="text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    {row.parkHrFactor.toFixed(2)}
                    {row.parkHrFactor === topFactor ? (
                      <Badge variant="success">Hot</Badge>
                    ) : null}
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
