"use client";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import { TeamSplitRow } from "../mock/teamDashboardData";

type TabKey = "overview" | "homeAway" | "lhpRhp" | "monthly";

type TeamSplitsCardProps = {
  overview: TeamSplitRow[];
  homeAway: TeamSplitRow[];
  lhpRhp: TeamSplitRow[];
  monthly: TeamSplitRow[];
};

/**
 * TeamSplitsCard presents HR/G across split dimensions with tabs.
 */
export function TeamSplitsCard({
  overview,
  homeAway,
  lhpRhp,
  monthly,
}: TeamSplitsCardProps) {
  const tabData: Record<TabKey, { label: string; rows: TeamSplitRow[] }> = {
    overview: { label: "Overview", rows: overview },
    homeAway: { label: "Home vs Away", rows: homeAway },
    lhpRhp: { label: "LHP vs RHP", rows: lhpRhp },
    monthly: { label: "Monthly", rows: monthly },
  };

  return (
    <Card>
      <Tabs defaultValue="overview">
        <CardHeader>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Team Splits
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">HR per game by context</p>
          </div>
          <TabList className="justify-end">
            {(Object.keys(tabData) as TabKey[]).map((tabKey) => (
              <Tab key={tabKey} value={tabKey}>
                {tabData[tabKey].label}
              </Tab>
            ))}
          </TabList>
        </CardHeader>
        <CardBody className="overflow-hidden rounded-lg border border-slate-100 p-0 dark:border-slate-800">
          {(Object.keys(tabData) as TabKey[]).map((tabKey) => (
            <TabPanel key={tabKey} value={tabKey}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Split</Th>
                    <Th>HR/G</Th>
                    <Th>League Avg</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tabData[tabKey].rows.map((row) => (
                    <Tr key={row.label}>
                      <Td className="font-semibold text-slate-900 dark:text-slate-50">
                        {row.label}
                      </Td>
                      <Td className="text-slate-800 dark:text-slate-200">
                        {row.hrPerGame.toFixed(2)}
                      </Td>
                      <Td className="text-slate-600 dark:text-slate-300">
                        {row.leagueAvgHrPerGame
                          ? `${row.leagueAvgHrPerGame.toFixed(2)} HR/G`
                          : "—"}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          ))}
        </CardBody>
      </Tabs>
    </Card>
  );
}
