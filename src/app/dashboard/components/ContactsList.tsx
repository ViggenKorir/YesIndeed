"use client";

import React, { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MoreHorizontal } from "lucide-react";
import type { Contact, Role } from "../utils";
import { canView } from "../utils";
import { useAlert } from "@/components/ui/Alert";

/**
 * ContactsList component
 *
 * - Presentational list of contacts for the dashboard right column.
 * - Provides search, selection, messaging and bulk actions.
 * - Respects role-based access via `canView(role, "contacts")`.
 *
 * Props:
 *  - contacts: Contact[]         -> list of contacts to display
 *  - role: Role                  -> current user role (for permission checks)
 *  - onMessage?: (c: Contact)    -> callback to open message composer
 *
 * Notes:
 *  - This component is intentionally presentational and delegates server-side
 *    persistence/navigation to parent handlers through callbacks.
 *  - Use `useAlert()` for consistent user feedback.
 */

type Props = {
  contacts: Contact[];
  role: Role;
  onMessage?: (c: Contact) => void;
};

export default function ContactsList({ contacts, role, onMessage }: Props) {
  const allowed = canView(role, "contacts");
  const { notify } = useAlert();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        (c.company ?? "").toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q) ||
        (c.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [contacts, query]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const clone = new Set(prev);
      if (clone.has(id)) clone.delete(id);
      else clone.add(id);
      return clone;
    });
  };

  const selectAllVisible = (checked: boolean) => {
    if (checked) {
      setSelected(new Set(filtered.map((c) => c.id)));
    } else {
      setSelected(new Set());
    }
  };

  const handleMessage = (contact: Contact) => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You do not have permission to message contacts.", variant: "error" });
      return;
    }
    if (onMessage) {
      onMessage(contact);
      notify({ title: "Message", description: `Opened message composer for ${contact.name} (simulated)`, variant: "info" });
    } else {
      notify({ title: "Message", description: `Message simulated to ${contact.name}`, variant: "success" });
    }
  };

  const handleBulkMessage = () => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You do not have permission to message contacts.", variant: "error" });
      return;
    }
    if (selected.size === 0) {
      notify({ title: "No selection", description: "Please select contacts to message.", variant: "info" });
      return;
    }
    // Simulate sending
    notify({ title: "Bulk message", description: `Messaging ${selected.size} contacts (simulated)`, variant: "success" });
    setSelected(new Set());
  };

  const handleDelete = (contact: Contact) => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You do not have permission to delete contacts.", variant: "error" });
      return;
    }
    const ok = confirm(`Delete ${contact.name}? This action cannot be undone.`);
    if (!ok) {
      notify({ title: "Cancelled", description: "Delete cancelled", variant: "info" });
      return;
    }
    // Delegate deletion to parent in a real app. Here we just notify.
    notify({ title: "Deleted", description: `${contact.name} removed (simulated)`, variant: "success" });
    setSelected((prev) => {
      const clone = new Set(prev);
      clone.delete(contact.id);
      return clone;
    });
  };

  const handleBulkDelete = () => {
    if (!allowed) {
      notify({ title: "Access denied", description: "You do not have permission to delete contacts.", variant: "error" });
      return;
    }
    if (selected.size === 0) {
      notify({ title: "No selection", description: "Please select contacts to delete.", variant: "info" });
      return;
    }
    const ok = confirm(`Delete ${selected.size} selected contacts?`);
    if (!ok) {
      notify({ title: "Cancelled", description: "Bulk delete cancelled", variant: "info" });
      return;
    }
    notify({ title: "Deleted", description: `${selected.size} contacts deleted (simulated)`, variant: "success" });
    setSelected(new Set());
  };

  return (
    <Card className="p-4" aria-labelledby="contacts-heading">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 id="contacts-heading" className="text-lg font-semibold text-foreground">
            Contacts
          </h3>
          <p className="text-sm text-muted-foreground">
            People and organizations you engage with frequently.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search contacts, company, email or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-[220px] bg-white"
            aria-label="Search contacts"
          />

          <div className="hidden sm:flex items-center gap-2">
            <Button
              className="bg-gradient-to-r from-green-900 to-green-600 text-white"
              onClick={handleBulkMessage}
            >
              <Mail className="h-4 w-4 mr-2" /> Message selected
            </Button>

            <Button variant="outline" className="border-red-600 text-red-700" onClick={handleBulkDelete}>
              Delete selected
            </Button>
          </div>
        </div>
      </div>

      {!allowed ? (
        <div className="rounded-md border border-dashed border-muted p-6 text-center">
          <p className="text-sm text-muted-foreground">You don't have access to contacts for your current role.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selected.size > 0 && selected.size === filtered.length && filtered.length > 0}
                    onCheckedChange={(v) => selectAllVisible(Boolean(v))}
                    aria-label="Select all visible contacts"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden lg:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell>
                    <Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggleSelect(c.id)} aria-label={`Select ${c.name}`} />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-foreground truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{c.email ?? "—"}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{c.company ?? "—"}</TableCell>

                  <TableCell className="hidden md:table-cell">
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline inline-flex items-center gap-2">
                        <Mail className="h-4 w-4" /> <span className="text-sm">{c.email}</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {c.phone ? (
                      <a href={`tel:${c.phone}`} className="text-blue-600 hover:underline inline-flex items-center gap-2">
                        <Phone className="h-4 w-4" /> <span className="text-sm">{c.phone}</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleMessage(c)} aria-label={`Message ${c.name}`}>
                        <Mail className="h-4 w-4" />
                      </Button>

                      <Button size="icon" variant="ghost" onClick={() => handleDelete(c)} aria-label={`Delete ${c.name}`}>
                        <MoreHorizontal className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
