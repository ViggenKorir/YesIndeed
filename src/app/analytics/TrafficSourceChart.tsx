"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Organic Search', value: 45, color: 'hsl(var(--chart-primary))' },
  { name: 'Direct', value: 25, color: 'hsl(var(--chart-secondary))' },
  { name: 'Social Media', value: 18, color: 'hsl(var(--chart-tertiary))' },
  { name: 'Email', value: 12, color: 'hsl(var(--chart-quaternary))' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">{`${data.value}%`}</p>
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
              <p className="text-sm font-medium text-foreground">{entry.name}</p>
              <p className="text-xs text-muted-foreground">{entry.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};