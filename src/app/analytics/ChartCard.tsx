import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, description, children, className = "" }: ChartCardProps) => {
  return (
    <div className={`chart-container ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};