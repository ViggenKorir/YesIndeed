"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TooltipProps } from "recharts";

interface ChartData {
  month: string;
  revenue: number;
  users: number;
}

interface PayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const data = [
  { month: "Jan", revenue: 12000, users: 850 },
  { month: "Feb", revenue: 15000, users: 920 },
  { month: "Mar", revenue: 18000, users: 1100 },
  { month: "Apr", revenue: 22000, users: 1350 },
  { month: "May", revenue: 26000, users: 1580 },
  { month: "Jun", revenue: 28000, users: 1720 },
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{`${label}`}</p>
        {payload.map(
          (
            entry: { dataKey: string; value: number; color: string },
            index: number,
          ) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey === "revenue" ? "Revenue" : "Users"}: ${
                entry.dataKey === "revenue"
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value.toLocaleString()
              }`}
            </p>
          ),
        )}
      </div>
    );
  }
  return null;
};

export const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="month"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-primary))", strokeWidth: 2, r: 6 }}
          activeDot={{
            r: 8,
            stroke: "hsl(var(--chart-primary))",
            strokeWidth: 2,
          }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--chart-secondary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-secondary))", strokeWidth: 2, r: 6 }}
          activeDot={{
            r: 8,
            stroke: "hsl(var(--chart-secondary))",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
