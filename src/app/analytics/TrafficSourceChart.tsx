"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TooltipProps } from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Add index signature for string keys
}

const data: ChartData[] = [
  { name: "Organic Search", value: 45, color: "hsl(var(--chart-primary))" },
  { name: "Direct", value: 25, color: "hsl(var(--chart-secondary))" },
  { name: "Social Media", value: 18, color: "hsl(var(--chart-tertiary))" },
  { name: "Email", value: 12, color: "hsl(var(--chart-quaternary))" },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    payload: ChartData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{dataPoint.name}</p>
        <p className="text-sm text-muted-foreground">{`${dataPoint.value}%`}</p>
      </div>
    );
  }
  return null;
};

export const TrafficSourceChart = () => {
  return (
    <div className="flex items-center gap-8">
      <ResponsiveContainer width="60%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-3">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {entry.name}
              </p>
              <p className="text-xs text-muted-foreground">{entry.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
