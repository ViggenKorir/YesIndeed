"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, ListChecks } from "lucide-react";
import type { Task, Role } from "../utils";
import { canView } from "../utils";
import { useAlert } from "@/components/ui/Alert";

type Props = {
  tasks: Task[];
  role: Role;
  onToggle: (id: string) => void;
  onCreate?: (title: string) => void; // optional hook for parent to create tasks
};

/**
 * TeamTasks
 *
 * Presentational task list for the dashboard.
 * - Respects role-based access (tasks area) using canView
 * - Visually emphasizes the agency palette using subtle gradients and shadow
 * - Delegates side-effects to parent handlers via props
 *
 * Notes:
 * - Keep this component mostly presentational to support easy testing and reuse.
 */
export default function TeamTasks({ tasks = [], role, onToggle, onCreate }: Props) {
  const allowed = canView(role, "tasks");
  const { notify } = useAlert();

  const handleToggle = (id: string) => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You don't have permission to update tasks.", variant: "error" });
      return;
    }
    onToggle(id);
    notify({ title: "Task updated", description: "Task status toggled.", variant: "info" });
  };

  const handleCreate = () => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You don't have permission to create tasks.", variant: "error" });
      return;
    }
    if (onCreate) {
      // parent handles creation (e.g., show modal). We call with an empty placeholder name.
      onCreate("New task");
      notify({ title: "New task", description: "Task creation initialized (simulated).", variant: "success" });
    } else {
      notify({ title: "Not configured", description: "Task creation is not enabled in this demo.", variant: "info" });
    }
  };

  return (
    <Card className="p-4" aria-labelledby="team-tasks-heading">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="rounded-full p-2 inline-flex items-center justify-center"
            style={{ background: "linear-gradient(90deg,#0f172a,#1e293b)", boxShadow: "0 6px 18px rgba(15,23,42,0.08)" }}
          >
            <ListChecks className="h-5 w-5 text-white" />
          </div>

          <div>
            <h3 id="team-tasks-heading" className="text-lg font-semibold text-foreground">
              Team Tasks
            </h3>
            <p className="text-sm text-muted-foreground">Assign, track and close work items across teams.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden md:inline-flex bg-gradient-to-r from-green-900 to-green-600 text-white"
            onClick={handleCreate}
            aria-label="Create task"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            New Task
          </Button>

          {!allowed && <div className="text-xs text-amber-600 font-medium">Read-only</div>}
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-md border border-dashed border-muted p-6 text-center text-sm text-muted-foreground">
            No tasks available
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className={`flex items-start justify-between gap-4 bg-white p-3 rounded-md shadow-sm transition-colors ${
                t.completed ? "opacity-80" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div>
                  <Checkbox
                    checked={Boolean(t.completed)}
                    onCheckedChange={() => handleToggle(t.id)}
                    aria-label={`Mark ${t.title} as ${t.completed ? "incomplete" : "complete"}`}
                  />
                </div>

                <div className="min-w-0">
                  <div className={`text-sm font-medium truncate ${t.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {t.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.assignee ?? "Unassigned"} • {t.due ?? "No due date"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{t.due ?? "—"}</span>
                </div>
                <div className="text-sm font-medium">
                  {t.completed ? (
                    <span className="text-emerald-700">Done</span>
                  ) : (
                    <span className="text-muted-foreground">Open</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
