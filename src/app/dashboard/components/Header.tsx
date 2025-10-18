"use client";

import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart2, UserCircle2, Settings, Users } from "lucide-react";
import type { Role } from "../utils";

/**
 * Header component for the Dashboard route.
 *
 * Responsibilities:
 * - Display page title and short description
 * - Provide role switcher for development/testing (replace with real auth UI)
 * - Respect the agency Hero palette (green gradient accents)
 *
 * Usage:
 * <Header role={role} onRoleChange={setRole} />
 */

type Props = {
  role: Role;
  onRoleChange: (role: Role) => void;
};

export default function Header({ role, onRoleChange }: Props) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex items-start md:items-center gap-4">
        <div
          className="rounded-full p-3 inline-flex items-center justify-center"
          style={{
            background: "linear-gradient(90deg,#0f172a,#1e293b)",
            boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
          }}
        >
          <BarChart2 className="h-6 w-6 text-white" />
        </div>

        <div className="leading-tight">
          <h1 className="text-2xl font-semibold text-foreground">Agency Dashboard</h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Overview & controls — role:{" "}
            <span className="font-medium text-foreground">{role}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="hidden sm:flex items-center gap-3 bg-white/60 rounded-md px-3 py-1 shadow-sm">
          <UserCircle2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Signed in as</div>
            <div className="text-sm font-medium">You / Demo</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue={role} onValueChange={(v) => onRoleChange(v as Role)}>
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="hidden md:inline-flex bg-gradient-to-r from-green-900 to-green-600 text-white"
            variant="ghost"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>

          <Button variant="outline" className="hidden lg:inline-flex">
            <Users className="h-4 w-4 mr-2" />
            Team
          </Button>
        </div>
      </div>
    </header>
  );
}
