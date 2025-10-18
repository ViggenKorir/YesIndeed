"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Box, MoreHorizontal } from "lucide-react";
import type { Deal as DealType, Role } from "../utils";
import { formatKES, canView } from "../utils";

/**
 * PipelinePreview
 *
 * Presentational component showing a compact view of deals in the sales pipeline.
 * - Respects role-based access via `canView(role, "pipeline")`
 * - Uses the agency Hero palette (green gradient) for accents and a clean, professional layout
 *
 * Props:
 * - deals: Deal[] - list of deals to display
 * - role: Role - current user's role (used for permission checks)
 * - onMove: (id: string, dir: -1 | 1) => void - callback to move a deal left/right
 *
 * Notes:
 * - This component is purely presentational and delegates behavior (navigation, API calls)
 *   to parent handlers via `onMove`.
 */

type Props = {
  deals?: DealType[];
  role: Role;
  onMove?: (id: string, dir: -1 | 1) => void;
};

export default function PipelinePreview({ deals = [], role, onMove }: Props) {
  const allowed = canView(role, "pipeline");

  // Sort deals by amount desc for a more meaningful preview
  const sorted = [...deals].sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));

  return (
    <Card className="p-4" aria-labelledby="pipeline-preview-heading">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 id="pipeline-preview-heading" className="text-lg font-semibold text-foreground">
            Sales Pipeline
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Quick glance at prioritized deals — move items between stages or open to see details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            aria-hidden
            className="hidden sm:inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-white"
            style={{ background: "linear-gradient(90deg,#0f172a,#1e293b)" }}
          >
            <Box className="h-4 w-4 mr-2" />
            Pipeline
          </div>
          {!allowed && (
            <div className="text-xs text-amber-600 font-medium">Restricted</div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-md border border-dashed border-muted p-6 text-center text-sm text-muted-foreground">
            No deals to display
          </div>
        ) : (
          sorted.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between gap-3 bg-white p-3 rounded-md shadow-sm"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{d.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{d.company}</div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end text-right">
                    <div className="text-sm font-semibold">{formatKES(d.amount ?? 0)}</div>
                    <div className="text-xs text-muted-foreground">{d.stage ?? "—"}</div>
                  </div>
                </div>

                {/* mobile */}
                <div className="mt-2 flex items-center justify-between sm:hidden">
                  <div className="text-sm font-semibold">{formatKES(d.amount ?? 0)}</div>
                  <div className="text-xs text-muted-foreground">{d.stage ?? "—"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {allowed ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onMove?.(d.id, -1)}
                      aria-label={`Move ${d.title} to previous stage`}
                      className="p-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onMove?.(d.id, 1)}
                      aria-label={`Move ${d.title} to next stage`}
                      className="p-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`More actions for ${d.title}`}
                      className="p-2"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-xs text-muted-foreground">No actions</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-end">
        <div className="text-xs text-muted-foreground mr-3">Updated moments ago</div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-green-900 to-green-600 text-white"
          onClick={() => {
            // lightweight UX: parent should implement real navigation; keep local handler passive
            // This button is intentionally delegated to the parent in a real integration.
            // Here we provide a safe no-op that is accessible to keyboard users.
          }}
        >
          View pipeline
        </Button>
      </div>
    </Card>
  );
}
