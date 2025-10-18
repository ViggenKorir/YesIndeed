"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import type { Invoice, LineItem } from "./components/types";

/**
 * Invoice Page with Clerk Authentication
 *
 * - Uses Clerk's useAuth hook to check authentication status
 * - Redirects unauthenticated users to sign-in page
 * - Shows loading state while Clerk initializes
 * - Maintains all existing invoice management functionality
 */

const SAMPLE_INVOICES: Invoice[] = [
  {
    id: "inv_001",
    number: "INV-2025-001",
    clientName: "Acme Corp",
    clientEmail: "procurement@acme.example",
    createdAt: "2025-09-01",
    dueDate: "2025-09-15",
    currency: "USD",
    items: [
      {
        id: "li_1",
        description: "Website Design (Landing + 5 internal pages)",
        qty: 1,
        unitPrice: 4000,
      },
      {
        id: "li_2",
        description: "CMS Integration (Prismic)",
        qty: 1,
        unitPrice: 1300,
      },
      { id: "li_3", description: "SEO Foundations", qty: 1, unitPrice: 800 },
    ],
    paid: false,
    notes: "Thank you for choosing Automated Quotation Generator.",
    issuedBy: "YesIndeed Agency",
    terms: "Payable within 14 days. Late fee of 2% per month applies.",
  },
  {
    id: "inv_002",
    number: "INV-2025-002",
    clientName: "Beta Startup",
    clientEmail: "hello@beta.example",
    createdAt: "2025-08-18",
    dueDate: "2025-09-01",
    currency: "USD",
    items: [
      {
        id: "li_21",
        description: "E-commerce Build (Shopify + custom checkout)",
        qty: 1,
        unitPrice: 11000,
      },
      {
        id: "li_22",
        description: "Payment gateway integration",
        qty: 1,
        unitPrice: 1200,
      },
    ],
    paid: true,
    notes: "Project completed. This invoice covers phases 1–2.",
    issuedBy: "YesIndeed Agency",
    terms: "Paid. Receipt available upon request.",
  },
];

export default function InvoicePage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Invoice state
  const [invoices, setInvoices] = useState<Invoice[]>(SAMPLE_INVOICES);
  const [selectedId, setSelectedId] = useState<string | null>(
    invoices[0]?.id ?? null,
  );

  const selected = useMemo(
    () => invoices.find((i) => i.id === selectedId) ?? null,
    [invoices, selectedId],
  );

  // Auth check effect
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
          <p className="text-sm text-gray-600 mt-2">
            Verifying your authentication status
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not signed in (redirect is happening)
  if (!isSignedIn) {
    return null;
  }

  // Invoice action handlers
  function togglePaid(invoiceId: string) {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, paid: !inv.paid } : inv,
      ),
    );
  }

  function downloadPDF(invoice: Invoice) {
    const printContent = document.getElementById("invoice-print-area");
    if (!printContent) {
      return;
    }
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>${invoice.number} — ${invoice.clientName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
            h1 { font-size: 18px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
            .right { text-align: right; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  }

  async function sendInvoiceEmail(invoice: Invoice) {
    // TODO: Wire to POST /api/invoices/:id/send
    alert(
      `Send email placeholder: ${invoice.number} to ${invoice.clientEmail ?? "no-email"}`,
    );
  }

  function createNewInvoice() {
    const newInv: Invoice = {
      id: `inv_${Math.random().toString(36).slice(2, 9)}`,
      number: `INV-2025-${String(invoices.length + 1).padStart(3, "0")}`,
      clientName: "New Client",
      clientEmail: "",
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 14 * 24 * 3600 * 1000)
        .toISOString()
        .slice(0, 10),
      currency: "USD",
      items: [
        {
          id: "li_new",
          description: "Service",
          qty: 1,
          unitPrice: 0,
        },
      ],
      paid: false,
    };
    setInvoices((prev) => [newInv, ...prev]);
    setSelectedId(newInv.id);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Invoices</h1>
              <p className="text-sm text-gray-600">
                Manage issued invoices, download PDFs, and mark payments.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-medium text-gray-900">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <InvoiceList
              invoices={invoices}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
              onCreate={createNewInvoice}
              onDelete={(id) => {
                setInvoices((prev) => prev.filter((p) => p.id !== id));
                if (selectedId === id) setSelectedId(null);
              }}
            />
          </aside>

          <section className="lg:col-span-2">
            {selected ? (
              <div
                id="invoice-print-area"
                className="bg-white rounded shadow p-6"
              >
                <InvoiceDetail
                  invoice={selected}
                  onTogglePaid={() => togglePaid(selected.id)}
                  onDownload={() => downloadPDF(selected)}
                  onSend={() => sendInvoiceEmail(selected)}
                  onUpdateItem={(itemId, patch) => {
                    setInvoices((prev) =>
                      prev.map((inv) =>
                        inv.id === selected.id
                          ? {
                              ...inv,
                              items: inv.items.map((it) =>
                                it.id === itemId ? { ...it, ...patch } : it,
                              ),
                            }
                          : inv,
                      ),
                    );
                  }}
                  onAddItem={(newItem: LineItem) => {
                    setInvoices((prev) =>
                      prev.map((inv) =>
                        inv.id === selected?.id
                          ? { ...inv, items: [...inv.items, newItem] }
                          : inv,
                      ),
                    );
                  }}
                  onRemoveItem={(itemId: string) => {
                    setInvoices((prev) =>
                      prev.map((inv) =>
                        inv.id === selected?.id
                          ? {
                              ...inv,
                              items: inv.items.filter((i) => i.id !== itemId),
                            }
                          : inv,
                      ),
                    );
                  }}
                />
              </div>
            ) : (
              <div className="bg-white rounded shadow p-6 text-center">
                <h3 className="text-lg font-semibold">No invoice selected</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Create a new invoice or select one from the list.
                </p>
                <div className="mt-4">
                  <button
                    onClick={createNewInvoice}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Create invoice
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

// Components moved to `components/invoice/`:
// - InvoiceList (YesIndeed/src/app/invoice/components/InvoiceList.tsx)
// - InvoiceDetail (YesIndeed/src/app/invoice/components/InvoiceDetail.tsx)
// - Shared types/helpers (YesIndeed/src/app/invoice/components/types.ts)
//
// The implementations were intentionally extracted to keep the page file focused on state and wiring.
// If you need to run quick local changes, update the component files in the components directory above.
