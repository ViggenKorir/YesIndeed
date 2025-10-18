"use client";

import React from "react";
import type {
  Invoice as InvoiceType,
  LineItem as LineItemType,
  Currency,
} from "./types";

type Props = {
  invoice: InvoiceType;
  onTogglePaid: () => void;
  onDownload: () => void;
  onSend: () => void;
  onUpdateItem: (itemId: string, patch: Partial<LineItemType>) => void;
  onAddItem?: (item: LineItemType) => void;
  onRemoveItem?: (itemId: string) => void;
};

/**
 * Local helpers kept inside the component file so this module is self-contained.
 */
function formatCurrency(value: number, currency: Currency) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function calculateTotals(items: LineItemType[]) {
  const subtotal = items.reduce(
    (s: number, it: LineItemType) => s + it.qty * it.unitPrice,
    0,
  );
  const tax = Math.round(subtotal * 0.12); // demo 12% tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

/**
 * InvoiceDetail component
 *
 * Responsibilities:
 *  - Render invoice header and metadata
 *  - List editable line items (description, qty, unit price)
 *  - Show totals (subtotal, tax, total)
 *  - Expose actions: send, download, mark paid/unpaid, add/remove item
 *
 * Note: Parent component is expected to persist changes when `onUpdateItem`, `onAddItem`, and `onRemoveItem` are called.
 */
export default function InvoiceDetail({
  invoice,
  onTogglePaid,
  onDownload,
  onSend,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: Props) {
  const { subtotal, tax, total } = calculateTotals(invoice.items);

  function handleAddItem() {
    const newItem: LineItemType = {
      id: `li_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      description: "New service or product",
      qty: 1,
      unitPrice: 0,
    };
    if (onAddItem) {
      onAddItem(newItem);
    } else {
      // Fallback: call onUpdateItem for the parent to pick up (not ideal but safe)
      // Parent can choose to ignore this if it doesn't implement onAddItem
      onUpdateItem(newItem.id, newItem);
    }
  }

  function handleRemoveItem(itemId: string) {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    } else {
      // As above, try to zero-out the item as a fallback (caller should implement remove)
      onUpdateItem(itemId, { qty: 0, unitPrice: 0, description: "" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{invoice.number}</h2>
          <div className="text-sm text-gray-600">{invoice.clientName}</div>
          <div className="text-xs text-gray-500">
            Issued: {invoice.createdAt} • Due: {invoice.dueDate}
          </div>
          {invoice.clientEmail && (
            <div className="text-xs text-gray-500 mt-1">
              Email: {invoice.clientEmail}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded text-sm ${invoice.paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            aria-live="polite"
          >
            {invoice.paid ? "Paid" : "Pending"}
          </span>

          <button
            onClick={onTogglePaid}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
            aria-pressed={invoice.paid}
          >
            {invoice.paid ? "Mark Unpaid" : "Mark Paid"}
          </button>

          <button
            onClick={onDownload}
            className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-900"
            aria-label="Download invoice PDF"
          >
            Download PDF
          </button>
        </div>
      </div>

      <section className="border rounded p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Line items</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddItem}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              aria-label="Add line item"
            >
              + Add item
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="min-w-[40%]">Description</th>
                <th className="w-24">Qty</th>
                <th className="w-32 text-right">Unit</th>
                <th className="w-32 text-right">Total</th>
                <th className="w-16 text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="py-2 align-top">
                    <input
                      className="w-full border-b focus:outline-none text-sm"
                      value={it.description}
                      onChange={(e) =>
                        onUpdateItem(it.id, { description: e.target.value })
                      }
                      aria-label={`Description for ${it.description}`}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      Item ID: {it.id}
                    </div>
                  </td>

                  <td className="align-top">
                    <input
                      type="number"
                      min={0}
                      className="w-full border-b text-right"
                      value={it.qty}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value || 0));
                        onUpdateItem(it.id, { qty: v });
                      }}
                      aria-label={`Quantity for ${it.description}`}
                    />
                  </td>

                  <td className="align-top">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className="w-full border-b text-right"
                      value={it.unitPrice}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value || 0));
                        onUpdateItem(it.id, { unitPrice: v });
                      }}
                      aria-label={`Unit price for ${it.description}`}
                    />
                  </td>

                  <td className="text-right align-top py-2">
                    {formatCurrency(it.qty * it.unitPrice, invoice.currency)}
                  </td>

                  <td className="text-center align-top">
                    <button
                      onClick={() => handleRemoveItem(it.id)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
                      aria-label={`Remove ${it.description}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {invoice.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No line items. Click &quot;Add item&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end gap-6">
          <div className="w-64 bg-gray-50 p-3 rounded text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal, invoice.currency)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Tax (12%)</span>
              <strong>{formatCurrency(tax, invoice.currency)}</strong>
            </div>
            <div className="flex justify-between mt-2 text-lg">
              <span>Total</span>
              <strong>{formatCurrency(total, invoice.currency)}</strong>
            </div>
          </div>
        </div>
      </section>

      {invoice.notes && (
        <section className="bg-white rounded shadow p-4">
          <h4 className="text-sm font-medium">Notes</h4>
          <p className="text-sm text-gray-700">{invoice.notes}</p>
        </section>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onSend}
          className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
        >
          Send Email
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={onTogglePaid}
          className="px-4 py-2 border rounded text-sm"
        >
          {invoice.paid ? "Mark Unpaid" : "Mark Paid"}
        </button>
      </div>
    </div>
  );
}
