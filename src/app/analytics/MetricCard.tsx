"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
}

export const MetricCard = ({ title, value, change, changeLabel, icon }: MetricCardProps) => {
  const isPositive = change > 0;
  
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-chart-secondary' : 'text-chart-danger'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold text-foreground">
          {value}
        </div>
        <p className="text-sm text-muted-foreground">
          {changeLabel}
        </p>
      </div>
    </div>
  );
};