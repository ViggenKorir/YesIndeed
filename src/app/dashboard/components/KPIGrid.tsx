"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import type { KPI } from "../utils";

/**
 * KPIGrid
 * - Presentational grid to display key performance indicators.
 * - Uses the agency Hero palette (green gradient accents) for a professional look.
 *
 * Props:
 * - items: KPI[] - array of KPI objects with `id`, `label`, `value`, and optional `trend`.
 *
 * Notes:
 * - This component is intentionally simple and purely presentational. Move logic outside
 *   (data fetching, aggregation) so this component can remain reusable and testable.
 */

type Props = {
  items: KPI[];
};

const trendClass = (trend?: string) => {
  if (!trend) return "bg-gray-100 text-gray-700";
  const sign = trend.trim().charAt(0);
  if (sign === "+") return "bg-emerald-50 text-emerald-700";
  if (sign === "-") return "bg-rose-50 text-rose-700";
  return "bg-slate-50 text-slate-700";
};

export default function KPIGrid({ items }: Props) {
  return (
    <section aria-labelledby="kpi-grid-heading" className="w-full">
      <h2 id="kpi-grid-heading" className="sr-only">
        Key performance indicators
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((kpi) => (
          <Card
            key={kpi.id}
            className="p-4 flex flex-col justify-between h-full border"
            aria-roledescription="kpi"
            aria-label={`${kpi.label}: ${kpi.value}${kpi.trend ? `, trend ${kpi.trend}` : ""}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{kpi.label}</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold text-foreground">
                  {kpi.value}
                </div>
              </div>

              {kpi.trend ? (
                <div
                  className={`ml-4 inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${trendClass(
                    kpi.trend,
                  )}`}
                >
                  {kpi.trend}
                </div>
              ) : (
                <div className="ml-4 inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-slate-50 text-slate-700">
                  —
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div
                className="h-1 flex-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg,#0f172a,#1e293b)",
                  opacity: 0.06,
                }}
                aria-hidden
              />
              <div className="text-xs text-muted-foreground">Updated recently</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
