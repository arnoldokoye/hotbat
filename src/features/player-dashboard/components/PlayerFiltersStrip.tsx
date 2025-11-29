import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

type PlayerFiltersStripProps = {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  pitchType: string;
  onPitchTypeChange: (value: string) => void;
  pitcherHand: string;
  onPitcherHandChange: (value: string) => void;
  onResetFilters: () => void;
};

const dateRangeOptions = ["Last 7 days", "Last 14 days", "Last 30 days", "Season to date"];
const pitchTypeOptions = ["All", "4-Seam", "Sinker", "Cutter", "Slider", "Curveball", "Changeup"];
const pitcherHandOptions = ["All", "vs LHP", "vs RHP"];

/**
 * PlayerFiltersStrip provides contextual filters for the player dashboard.
 */
export function PlayerFiltersStrip({
  dateRange,
  onDateRangeChange,
  pitchType,
  onPitchTypeChange,
  pitcherHand,
  onPitcherHandChange,
  onResetFilters,
}: PlayerFiltersStripProps) {
  return (
    <Card>
      <CardBody className="px-6 py-5">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Date Range"
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value)}
          >
            {dateRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Select
            label="Pitch Type"
            value={pitchType}
            onChange={(event) => onPitchTypeChange(event.target.value)}
          >
            {pitchTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Select
            label="Pitcher Hand"
            value={pitcherHand}
            onChange={(event) => onPitcherHandChange(event.target.value)}
          >
            {pitcherHandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <div className="flex items-end justify-start">
            <Button type="button" onClick={onResetFilters} variant="primary" className="w-full">
              Reset filters
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
