"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAlert } from "@/components/ui/Alert";
import { Users, UserCheck, UserX, ShieldCheck, Search as SearchIcon } from "lucide-react";
import type { Role, Contact } from "../utils";
import { canView, uid } from "../utils";

/**
 * AdminPanel
 *
 * - Extracted admin user-management panel for dashboard.
 * - Professional UI using agency palette (Hero gradient accents).
 * - Role-aware: intended to be rendered only when caller verifies admin access,
 *   but also performs a defensive check using `canView`.
 *
 * Props:
 * - currentRole: Role - role of the currently signed-in user (for permission checks)
 * - initialUsers?: { id, name, role }[] - optional seed users (client-side demo)
 * - onPromote?: (id, role) => void - optional callback when a user is promoted/role-changed
 * - onRevoke?: (id) => void - optional callback when a user is revoked/removed
 *
 * Notes:
 * - This component uses in-memory state for users; replace persistence with API calls.
 * - All user-facing actions trigger `useAlert().notify` for consistent feedback.
 */

type User = {
  id: string;
  name: string;
  role: Role;
  email?: string;
};

type Props = {
  currentRole: Role;
  initialUsers?: User[];
  onPromote?: (id: string, newRole: Role) => void;
  onRevoke?: (id: string) => void;
};

const defaultUsers: User[] = [
  { id: "u-1", name: "Alice Johnson", role: "manager", email: "alice@agency.test" },
  { id: "u-2", name: "Ben Roberts", role: "developer", email: "ben@agency.test" },
  { id: "u-3", name: "Carol Smith", role: "sales", email: "carol@agency.test" },
  { id: "u-4", name: "Dana Lee", role: "viewer", email: "dana@agency.test" },
];

const ALL_ROLES: Role[] = ["admin", "manager", "developer", "sales", "viewer"];

export default function AdminPanel({ currentRole, initialUsers = defaultUsers, onPromote, onRevoke }: Props) {
  const { notify } = useAlert();
  const [users, setUsers] = useState<User[]>(() => initialUsers.map((u) => ({ ...u })));
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Defensive guard: only admins should manage users. If caller rendered this incorrectly
  // show a friendly notice and keep the UI read-only.
  const allowed = canView(currentRole, "adminPanel");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [users, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const clone = new Set(prev);
      if (clone.has(id)) clone.delete(id);
      else clone.add(id);
      return clone;
    });
  };

  const selectAllVisible = (checked: boolean) => {
    if (checked) setSelected(new Set(paged.map((u) => u.id)));
    else setSelected(new Set());
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You are not authorized to change roles.", variant: "error" });
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    notify({ title: "Role updated", description: `User role set to ${newRole}`, variant: "success" });
    onPromote?.(id, newRole);
  };

  const handleRevoke = (id: string) => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You are not authorized to revoke users.", variant: "error" });
      return;
    }
    const user = users.find((u) => u.id === id);
    if (!user) return;
    // prevent an admin from revoking their own last admin access in a real app
    if (id === "u-1" && currentRole === "admin") {
      // this is just a demo rule - in a real app check server-side
    }
    const ok = confirm(`Revoke access for ${user.name}? This action cannot be undone.`);
    if (!ok) {
      notify({ title: "Cancelled", description: "Revocation cancelled", variant: "info" });
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelected((prev) => {
      const clone = new Set(prev);
      clone.delete(id);
      return clone;
    });
    notify({ title: "User revoked", description: `${user.name} access removed.`, variant: "warning" });
    onRevoke?.(id);
  };

  const handleBulkRevoke = () => {
    if (!allowed) return notify({ title: "Access denied", description: "You are not authorized to revoke users.", variant: "error" });
    if (selected.size === 0) return notify({ title: "No selection", description: "Select users to revoke.", variant: "info" });
    const ok = confirm(`Revoke ${selected.size} selected users?`);
    if (!ok) return notify({ title: "Cancelled", description: "Bulk revoke cancelled", variant: "info" });
    setUsers((prev) => prev.filter((u) => !selected.has(u.id)));
    notify({ title: "Users revoked", description: `${selected.size} users removed.`, variant: "warning" });
    setSelected(new Set());
  };

  const handleInvite = (name?: string, role?: Role) => {
    if (!allowed) return notify({ title: "Access denied", description: "You are not authorized to invite users.", variant: "error" });
    const newUser: User = { id: uid("u-"), name: name ?? `User ${users.length + 1}`, role: role ?? "viewer", email: `${Math.random().toString(36).slice(2,6)}@agency.test` };
    setUsers((prev) => [newUser, ...prev]);
    notify({ title: "User invited", description: `${newUser.name} invited as ${newUser.role}`, variant: "success" });
  };

  return (
    <Card className="p-4" aria-labelledby="admin-panel-heading">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="rounded-full p-2 inline-flex items-center justify-center"
            style={{ background: "linear-gradient(90deg,#0f172a,#1e293b)", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}
          >
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 id="admin-panel-heading" className="text-lg font-semibold text-foreground">Admin — User Management</h3>
            <p className="text-sm text-muted-foreground">Create, promote or revoke user access. Changes here should be audited server-side in production.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 bg-white rounded-md px-3 py-1 shadow-sm">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <Input aria-label="Search users" value={query} onChange={(e) => { setQuery(e.currentTarget.value); setPage(1); }} placeholder="Search name, email or role" className="min-w-[220px]" />
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-green-900 to-green-600 text-white" onClick={() => handleInvite()}>Invite user</Button>
            <Button variant="outline" onClick={handleBulkRevoke} className="text-rose-600 border-rose-200">Revoke selected</Button>
          </div>
        </div>
      </div>

      {!allowed ? (
        <div className="rounded-md border border-dashed p-6 text-center">
          <div className="text-sm text-muted-foreground">You do not have permission to administer users. Contact an administrator if you believe this is an error.</div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selected.size > 0 && selected.size === paged.length && paged.length > 0}
                      onCheckedChange={(v) => selectAllVisible(Boolean(v))}
                      aria-label="Select all visible users"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="w-32">Role</TableHead>
                  <TableHead className="w-36 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paged.map((u) => (
                  <TableRow key={u.id} className="hover:bg-muted/5 transition-colors">
                    <TableCell>
                      <Checkbox checked={selected.has(u.id)} onCheckedChange={() => toggleSelect(u.id)} aria-label={`Select ${u.name}`} />
                    </TableCell>

                    <TableCell>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground">{u.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{u.id}</div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{u.email ?? "—"}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select defaultValue={u.role} onValueChange={(v) => handleRoleChange(u.id, v as Role)}>
                          <SelectTrigger className="w-[120px] bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_ROLES.map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => notify({ title: "Audit", description: `${u.name} audit logs opened (simulated)`, variant: "info" })}>
                          <ShieldCheck className="h-4 w-4 mr-2" /> Audit
                        </Button>

                        <Button size="sm" variant="destructive" onClick={() => handleRevoke(u.id)}>
                          <UserX className="h-4 w-4 mr-2" /> Revoke
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
              <div className="px-3 py-1 rounded bg-slate-50 text-sm">{page} / {pages}</div>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>Next</Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
