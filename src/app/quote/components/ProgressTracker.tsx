'use client';

import React from 'react';

type Props = {
  step: number;
  total: number;
  /**
   * Optional className to allow small layout adjustments from parent.
   */
  className?: string;
  /**
   * Optional color variant. Accepts any Tailwind background utility for the inner bar.
   * Example: "bg-blue-600", "bg-gradient-to-r from-green-900 to-green-600", "bg-purple-600"
   */
  barClassName?: string;
};

/**
 * ProgressTracker
 *
 * Small, accessible progress indicator used in the multi-step quotation flow.
 * - Shows "Step X of Y" and a percentage to the right.
 * - Renders a thin progress bar with rounded edges.
 *
 * Usage:
 * <ProgressTracker step={2} total={5} />
 */
export default function ProgressTracker({
  step,
  total,
  className = '',
  barClassName = 'bg-gradient-to-r from-green-900 to-green-600',
}: Props) {
  const safeTotal = Math.max(1, Math.round(total));
  const safeStep = Math.min(safeTotal, Math.max(0, Math.round(step)));
  const pct = Math.round((safeStep / safeTotal) * 100);

  return (
    <div className={`mb-4 ${className}`} aria-hidden>
      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
        <span>
          Step {safeStep} of {safeTotal}
        </span>
        <span>{pct}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="w-full bg-gray-200 h-2 rounded overflow-hidden"
      >
        <div
          className={`${barClassName} h-2 rounded`}
          style={{ width: `${pct}%`, transition: 'width 220ms ease' }}
        />
      </div>
    </div>
  );
}
