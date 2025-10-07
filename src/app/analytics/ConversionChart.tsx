"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', conversions: 45, clicks: 1200 },
  { day: 'Tue', conversions: 52, clicks: 1350 },
  { day: 'Wed', conversions: 38, clicks: 980 },
  { day: 'Thu', conversions: 61, clicks: 1520 },
  { day: 'Fri', conversions: 58, clicks: 1480 },
  { day: 'Sat', conversions: 42, clicks: 1100 },
  { day: 'Sun', conversions: 35, clicks: 850 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === 'conversions' ? 'Conversions' : 'Clicks'}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ConversionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="day" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="conversions" 
          fill="hsl(var(--chart-primary))" 
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="clicks" 
          fill="hsl(var(--chart-secondary))" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};