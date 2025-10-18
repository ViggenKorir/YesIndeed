"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Briefcase, Eye } from "lucide-react";
import type { Project, Role } from "../utils";
import { formatKES, canView } from "../utils";

/**
 * ProjectsList
 *
 * Presentational component that lists projects in a compact, professional table.
 * - Respects role-based visibility through `canView`.
 * - Uses the agency palette (subtle dark gradient accent for header/actions).
 *
 * Props:
 * - projects: Project[] (list of projects to display)
 * - onOpen: (project) => void  (callback when a project is opened)
 * - role: Role (current user role for permission checks)
 * - showBudget?: boolean (optional: hide budget column for more restricted views)
 *
 * Notes:
 * - This component is intentionally presentational — side effects (navigation,
 *   server updates) should be handled by the parent container.
 */

type Props = {
  projects: Project[];
  onOpen: (p: Project) => void;
  role: Role;
  showBudget?: boolean;
};

const statusColor = (status: Project["status"]) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700";
    case "paused":
      return "bg-amber-50 text-amber-700";
    case "completed":
      return "bg-slate-50 text-slate-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default function ProjectsList({ projects, onOpen, role, showBudget = true }: Props) {
  const isAllowed = canView(role, "projects");

  return (
    <Card className="p-4" aria-labelledby="projects-heading">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full p-2 inline-flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg,#0f172a,#1e293b)",
              boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
            }}
            aria-hidden
          >
            <Briefcase className="h-5 w-5 text-white" />
          </div>

          <div>
            <h3 id="projects-heading" className="text-lg font-semibold text-foreground">
              Projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Active & recent projects — owner, status and budgets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAllowed ? (
            <>
              <Button
                className="hidden sm:inline-flex bg-gradient-to-r from-green-900 to-green-600 text-white"
                onClick={() => onOpen(projects[0])}
                aria-label="Open first project"
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" /> Open
              </Button>
              <Button variant="outline" size="sm" onClick={() => alert("Create project (simulated)")}>
                New Project
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Access restricted</div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[220px]">Project</TableHead>
              <TableHead className="w-28 hidden sm:table-cell">Status</TableHead>
              <TableHead className="w-28 hidden md:table-cell">Owner</TableHead>
              {showBudget && <TableHead className="w-36 text-right hidden lg:table-cell">Budget</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/5 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.id}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${statusColor(p.status)}`}>
                    {p.status}
                  </span>
                </TableCell>

                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.owner}</TableCell>

                {showBudget && (
                  <TableCell className="hidden lg:table-cell text-right font-medium">
                    {formatKES(p.budget)}
                  </TableCell>
                )}

                {/* Action cell visible on narrow screens */}
                <TableCell className="w-24 text-right">
                  {isAllowed ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onOpen(p)}>
                        View
                      </Button>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">—</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
