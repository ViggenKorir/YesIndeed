"use client";

import React from "react";
import type { Invoice } from "./types";
import { calculateTotals, formatCurrency } from "./types";

type Props = {
  invoices: Invoice[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

export default function InvoiceList({
  invoices,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Invoices</h2>
        <button
          onClick={onCreate}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          aria-label="Create invoice"
        >
          New
        </button>
      </div>

      <ul className="divide-y bg-white rounded shadow">
        {invoices.map((inv) => {
          const { total } = calculateTotals(inv.items);
          return (
            <li
              key={inv.id}
              className={`flex items-center justify-between p-3 cursor-pointer ${
                inv.id === selectedId ? "bg-gray-100" : ""
              }`}
            >
              <div onClick={() => onSelect(inv.id)} className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{inv.number}</span>
                  <span className="text-xs text-gray-500">
                    {inv.clientName}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {inv.createdAt} • Due {inv.dueDate}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm">
                    {formatCurrency(total, inv.currency)}
                  </div>
                  <div
                    className={`text-xs ${inv.paid ? "text-green-600" : "text-orange-600"}`}
                  >
                    {inv.paid ? "Paid" : "Unpaid"}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(inv.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label={`Delete ${inv.number}`}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
