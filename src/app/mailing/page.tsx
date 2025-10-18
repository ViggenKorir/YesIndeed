"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlert } from "@/components/ui/Alert";

/**
 * Mailing page
 * - Uses Hero palette (green gradient / green shades) for primary accents
 * - All currency shown in KES using Intl.NumberFormat('en-KE', { currency: 'KES' })
 * - Implements actionable handlers:
 *   - Add / Edit / Delete contacts
 *   - Select / Bulk delete
 *   - Customize pipeline: add stage
 *   - Move deals between stages (left/right)
 *   - Buttons for Exit setup / Continue
 *
 * The component is intentionally self-contained and uses in-memory state.
 * Replace state handlers with API calls where needed.
 */

/* -------------------------
   Types and helpers
   ------------------------- */
type Deal = {
  id: string;
  title: string;
  company?: string;
  amount: number; // amount in KES
};

type Stage = {
  id: string;
  name: string;
  items: Deal[];
};

type Contact = {
  id: string;
  name: string;
  organization?: string;
  email?: string;
  phone?: string;
};

const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 9)}`;

/* -------------------------
   Initial sample data
   ------------------------- */
const initialStages: Stage[] = [
  {
    id: "s-qualified",
    name: "Qualified",
    items: [
      {
        id: "d-1",
        title: "[Sample] Benjamin Leon",
        company: "Benjamin Leon",
        amount: 100000,
      }, // KES
      {
        id: "d-2",
        title: "[Sample] EmpowerMove",
        company: "EmpowerMove",
        amount: 80000,
      },
    ],
  },
  {
    id: "s-contact",
    name: "Contact Made",
    items: [
      {
        id: "d-3",
        title: "[Sample] Tony Turner",
        company: "MoveEr",
        amount: 300000,
      },
    ],
  },
  {
    id: "s-demo",
    name: "Demo Scheduled",
    items: [
      { id: "d-4", title: "[Sample] iTable", company: "iTable", amount: 70000 },
    ],
  },
  {
    id: "s-proposal",
    name: "Proposal Made",
    items: [
      {
        id: "d-5",
        title: "[Sample] Phyllis & Cie",
        company: "Phyllis & Cie",
        amount: 160000,
      },
    ],
  },
  {
    id: "s-negotiate",
    name: "Negotiations Started",
    items: [
      {
        id: "d-6",
        title: "[Sample] SoRock",
        company: "SoRock",
        amount: 310000,
      },
    ],
  },
];

const initialContacts: Contact[] = [
  {
    id: "c-1",
    name: "Benjamin Leon",
    organization: "",
    email: "benjamin.leon@gmial.com",
    phone: "785-202-7824",
  },
  {
    id: "c-2",
    name: "Tony Turner",
    organization: "[Sample] MoveEr",
    email: "tony.turner@movefr.com",
    phone: "218-348-8528",
  },
  {
    id: "c-3",
    name: "Phyllis Yang",
    organization: "[Sample] Phyllis & Cie",
    email: "phyllis.yang@gmial.com",
    phone: "240-707-3864",
  },
  {
    id: "c-4",
    name: "Otto Miller",
    organization: "[Sample] iTable",
    email: "otto.miller@itablee.eu",
    phone: "601-906-7534",
  },
  {
    id: "c-5",
    name: "Gloria Quinn",
    organization: "[Sample] EmpowerMove",
    email: "gloria.quinn@empowermove.com",
    phone: "862-252-9773",
  },
];

/* -------------------------
   Component
   ------------------------- */
export default function MailingPage() {
  // Pipeline & contacts state
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  // UI state
  const [showCustomize, setShowCustomize] = useState(false);
  const [newStageName, setNewStageName] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set(),
  );
  const [filterView, setFilterView] = useState<"people" | "organizations">(
    "people",
  );
  const { notify } = useAlert();

  /* -------------------------
     Pipeline actions
     ------------------------- */

  // Move deal left (-1) or right (+1)
  const moveDeal = (dealId: string, direction: -1 | 1) => {
    setStages((prev) => {
      // find stage index and deal
      const cloned = prev.map((s) => ({ ...s, items: [...s.items] }));
      let foundIndex = -1;
      for (let i = 0; i < cloned.length; i++) {
        if (cloned[i].items.find((d) => d.id === dealId)) {
          foundIndex = i;
          break;
        }
      }
      if (foundIndex === -1) return prev; // not found
      const dealIndex = cloned[foundIndex].items.findIndex(
        (d) => d.id === dealId,
      );
      const [deal] = cloned[foundIndex].items.splice(dealIndex, 1);
      const targetIndex = foundIndex + direction;
      if (targetIndex < 0 || targetIndex >= cloned.length) {
        // can't move; put it back
        cloned[foundIndex].items.splice(dealIndex, 0, deal);
        return cloned;
      }
      cloned[targetIndex].items.push(deal);
      return cloned;
    });
  };

  // Add new stage
  const addStage = () => {
    const name = newStageName.trim();
    if (!name) return;
    setStages((prev) => [...prev, { id: uid("s-"), name, items: [] }]);
    setNewStageName("");
    setShowCustomize(false);
  };

  // UI helpers to show totals per stage
  const stageTotals = useMemo(() => {
    return stages.map((s) => {
      const total = s.items.reduce((acc, it) => acc + it.amount, 0);
      return { id: s.id, total, count: s.items.length };
    });
  }, [stages]);

  /* -------------------------
     Contacts actions
     ------------------------- */
  const toggleSelectContact = (id: string) => {
    setSelectedContacts((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const selectAllVisible = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(new Set(contacts.map((c) => c.id)));
    } else {
      setSelectedContacts(new Set());
    }
  };

  const handleDeleteContact = (id: string) => {
    if (!confirm("Delete this contact? This action cannot be undone.")) {
      notify({
        title: "Cancelled",
        description: "Delete cancelled",
        variant: "info",
        duration: 3000,
      });
      return;
    }
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelectedContacts((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
    notify({
      title: "Contact deleted",
      description: "The contact has been removed.",
      variant: "success",
    });
  };

  const handleBulkDelete = () => {
    if (selectedContacts.size === 0) {
      notify({
        title: "No selection",
        description: "No contacts selected for bulk delete.",
        variant: "info",
      });
      return;
    }
    if (!confirm(`Delete ${selectedContacts.size} selected contacts?`)) {
      notify({
        title: "Cancelled",
        description: "Bulk delete cancelled",
        variant: "info",
      });
      return;
    }
    setContacts((prev) => prev.filter((c) => !selectedContacts.has(c.id)));
    setSelectedContacts(new Set());
    notify({
      title: "Contacts deleted",
      description: `${selectedContacts.size} contacts removed.`,
      variant: "success",
    });
  };

  const openAddContact = () => {
    setEditingContact(null);
    setShowAddContact(true);
  };

  const submitContactForm = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = ((form.get("name") as string) || "").trim();
    if (!name) {
      notify({
        title: "Validation error",
        description: "Name is required",
        variant: "error",
      });
      return;
    }
    const contactPayload: Contact = {
      id: editingContact?.id || uid("c-"),
      name,
      organization: (form.get("organization") as string) || "",
      email: (form.get("email") as string) || "",
      phone: (form.get("phone") as string) || "",
    };

    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === editingContact.id ? contactPayload : c)),
      );
      setEditingContact(null);
      setShowAddContact(false);
      notify({
        title: "Contact updated",
        description: `${contactPayload.name} updated.`,
        variant: "success",
      });
    } else {
      setContacts((prev) => [contactPayload, ...prev]);
      setShowAddContact(false);
      notify({
        title: "Contact added",
        description: `${contactPayload.name} added.`,
        variant: "success",
      });
    }
  };

  const startEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowAddContact(true);
  };

  /* -------------------------
     Header actions
     ------------------------- */
  const onContinue = () => {
    // Replace with proper navigation or API call
    console.log("Continue clicked - save progress and navigate");
    notify({
      title: "Progress saved",
      description: "Continue: progress saved (simulated).",
      variant: "info",
    });
  };

  const onExitSetup = () => {
    // Replace with navigation away or cleanup
    console.log("Exit setup clicked");
    notify({
      title: "Exit setup",
      description: "Returning to dashboard (simulated).",
      variant: "info",
    });
  };

  /* -------------------------
     Render
     ------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-1">
            Mailing Dashboard
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Manage your pipeline and contacts. Use this page to prepare targeted
            mailings and follow up with prospects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onExitSetup}
            className="border-green-800 text-green-900 hover:bg-green-50"
          >
            Exit setup
          </Button>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-green-900 to-green-600 text-white hover:opacity-95"
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Top hero-like info using Hero palette */}
      <Card className="p-6 mb-6 bg-[linear-gradient(90deg,#f8fff4,white)] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-600">
              Welcome — Prepare your mailing
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              This is your sales pipeline and contacts list. Use the controls to
              customize stages, add contacts, and compose targeted messages.
            </p>
            <div className="mt-4 flex gap-3">
              <Button
                onClick={() => setShowCustomize((s) => !s)}
                className="bg-white text-green-900 border"
              >
                Customize pipeline
              </Button>
              <Button
                onClick={openAddContact}
                className="bg-gradient-to-r from-green-900 to-green-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Add person
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="font-medium">Pipeline Summary</div>
            <div className="flex gap-4 mt-2">
              {stageTotals.map((t) => (
                <div
                  key={t.id}
                  className="bg-white px-3 py-2 rounded-md shadow-sm"
                >
                  <div className="text-xs text-muted-foreground">
                    {t.count} deals
                  </div>
                  <div className="font-semibold">
                    {currency.format(t.total)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Pipeline section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Pipeline</h3>
          <div className="text-sm text-muted-foreground">
            Dragless move: use arrows to move deals between stages
          </div>
        </div>

        {showCustomize && (
          <Card className="p-4 mb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addStage();
              }}
              className="flex gap-2 items-center"
            >
              <Input
                name="stage"
                placeholder="New stage name (e.g. Qualification)"
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-900 to-green-600 text-white"
              >
                Add stage
              </Button>
              <Button variant="outline" onClick={() => setShowCustomize(false)}>
                Cancel
              </Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex flex-col">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <h4 className="text-md font-semibold">{stage.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {currency.format(
                      stage.items.reduce((a, b) => a + b.amount, 0),
                    )}{" "}
                    · {stage.items.length} deals
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">...</div>
              </div>
              <div className="space-y-3">
                {stage.items.map((deal) => (
                  <Card
                    key={deal.id}
                    className="p-3 flex items-start justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium">{deal.title}</div>
                      {deal.company && (
                        <div className="text-xs text-muted-foreground">
                          {deal.company}
                        </div>
                      )}
                      <div className="text-sm mt-2 font-semibold">
                        {currency.format(deal.amount)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveDeal(deal.id, -1)}
                          className="p-1"
                          aria-label="Move left"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveDeal(deal.id, 1)}
                          className="p-1"
                          aria-label="Move right"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" aria-label="More">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {stage.items.length === 0 && (
                  <div className="text-sm text-muted-foreground bg-white p-3 rounded-md">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold">Contacts</h3>
            <Select
              onValueChange={(v) =>
                setFilterView(v as "people" | "organizations")
              }
              defaultValue="people"
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="people">People</SelectItem>
                <SelectItem value="organizations">Organizations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={openAddContact}
              className="bg-gradient-to-r from-green-900 to-green-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Person
            </Button>
            <Button
              variant="outline"
              onClick={handleBulkDelete}
              className="border-red-600 text-red-700"
            >
              Delete selected
            </Button>
          </div>
        </div>

        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedContacts.size === contacts.length &&
                      contacts.length > 0
                    }
                    onCheckedChange={(c) => selectAllVisible(Boolean(c))}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts
                .filter((c) =>
                  filterView === "people" ? true : Boolean(c.organization),
                )
                .map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.has(contact.id)}
                        onCheckedChange={() => toggleSelectContact(contact.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {contact.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {contact.organization}
                    </TableCell>
                    <TableCell>
                      {contact.email ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 hover:underline inline-flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />{" "}
                          <span className="text-sm">{contact.email}</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.phone ? (
                        <a
                          className="text-blue-600 hover:underline inline-flex items-center gap-2"
                          href={`tel:${contact.phone}`}
                        >
                          <Phone className="h-4 w-4" />{" "}
                          <span className="text-sm">{contact.phone}</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditContact(contact)}
                          aria-label="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteContact(contact.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Add / Edit contact panel (simple modal-ish UI) */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">
                {editingContact ? "Edit contact" : "Add contact"}
              </h4>
              <div className="text-sm text-muted-foreground">
                All fields optional except Name
              </div>
            </div>

            <form
              onSubmit={submitContactForm}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Full name
                </label>
                <Input
                  name="name"
                  defaultValue={editingContact?.name || ""}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Organization
                </label>
                <Input
                  name="organization"
                  defaultValue={editingContact?.organization || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  name="email"
                  defaultValue={editingContact?.email || ""}
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  name="phone"
                  defaultValue={editingContact?.phone || ""}
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddContact(false);
                    setEditingContact(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-900 to-green-600 text-white"
                >
                  {editingContact ? "Save changes" : "Add contact"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
