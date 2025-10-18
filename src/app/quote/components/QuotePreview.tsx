"use client";

import React from "react";
import type { Quote, QuoteLineItem } from "./types";
import { formatCurrency } from "./types";

type Props = {
  quote: Quote | null;
  suggestions?: QuoteLineItem[] | null;
  showFull: boolean;
};

/**
 * QuotePreview
 *
 * - Shows a compact live estimate while the user completes the multi-step form.
 * - When `showFull` is true and a `quote` exists, renders the detailed invoice-style report.
 *
 * This component is the extracted version of the preview used on the quotations page.
 */
export default function QuotePreview({ quote, suggestions, showFull }: Props) {
  if (!quote) {
    return (
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-medium">Estimated total</h3>
        <p className="text-sm text-gray-500 mt-2">
          Complete the form to see an estimate.
        </p>
      </div>
    );
  }

  // Compact live estimate shown while the user fills the form
  if (!showFull) {
    return (
      <div className="bg-white rounded shadow p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Estimated Total</h3>
          <div className="text-sm text-gray-500 mt-1">
            This is a live estimate as you fill the form.
          </div>
          {quote.aiNotes && (
            <div className="text-xs text-gray-400 mt-2">{quote.aiNotes}</div>
          )}
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold">
            {formatCurrency(quote.total, quote.currency)}
          </div>
          <div className="text-xs text-gray-400">
            Preliminary — final quote after generation
          </div>
        </div>
      </div>
    );
  }

  // Expanded invoice-style report
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Quotation</h2>
          <div className="text-sm text-gray-600 mt-1">
            Quotation ID: <span className="font-medium">{quote.id}</span>
          </div>
          <div className="text-xs text-gray-400">
            {new Date(quote.generatedAt).toLocaleString()}
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 bg-black text-white rounded flex items-center justify-center font-bold">
              YI
            </div>
            <div className="text-right">
              <div className="font-semibold">YesIndeed Agency</div>
              <div className="text-xs text-gray-500">info@yesindeed.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* From / To */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded border border-purple-100">
          <div className="text-sm font-medium text-purple-700 mb-1">
            Quotation by
          </div>
          <div className="text-sm text-gray-700">YesIndeed Agency</div>
          <div className="text-xs text-gray-500 mt-1">Nairobi, Kenya</div>
        </div>

        <div className="bg-purple-50 p-4 rounded border border-purple-100">
          <div className="text-sm font-medium text-purple-700 mb-1">
            Quotation to
          </div>
          <div className="text-sm text-gray-700">Client Company</div>
          <div className="text-xs text-gray-500 mt-1">
            Client Company Address
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="text-left px-4 py-3">Item / Description</th>
              <th className="w-24 text-right px-4 py-3">Qty</th>
              <th className="w-32 text-right px-4 py-3">Rate</th>
              <th className="w-32 text-right px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map((li, idx) => (
              <tr
                key={li.key}
                className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{li.label}</div>
                  {li.notes && (
                    <div className="text-xs text-gray-500">{li.notes}</div>
                  )}
                </td>
                <td className="text-right py-3 px-4">{li.qty}</td>
                <td className="text-right py-3 px-4">
                  {formatCurrency(li.unitPrice, quote.currency)}
                </td>
                <td className="text-right py-3 px-4">
                  {formatCurrency(li.total, quote.currency)}
                </td>
              </tr>
            ))}

            {suggestions && suggestions.length > 0 && (
              <>
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-sm text-purple-700">
                    Recommended add-ons
                  </td>
                </tr>
                {suggestions.map((s) => (
                  <tr key={s.key} className="bg-yellow-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{s.label}</div>
                      {s.notes && (
                        <div className="text-xs text-gray-500">{s.notes}</div>
                      )}
                    </td>
                    <td className="text-right py-3 px-4">{s.qty}</td>
                    <td className="text-right py-3 px-4">
                      {formatCurrency(s.unitPrice, quote.currency)}
                    </td>
                    <td className="text-right py-3 px-4">
                      {formatCurrency(s.total, quote.currency)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Terms and totals */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-purple-700 font-semibold">
            Terms and Conditions
          </h4>
          <ol className="text-xs text-gray-600 mt-2 space-y-2 list-decimal ml-5">
            <li>
              Payment due within 14 days of quotation acceptance. Late fees may
              apply.
            </li>
            <li>Quotation valid for 30 days unless otherwise specified.</li>
          </ol>

          <div className="mt-4 text-xs text-gray-500">
            {quote.aiNotes ?? "No additional notes."}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-72 border rounded p-4 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sub Total</span>
              <strong>{formatCurrency(quote.subtotal, quote.currency)}</strong>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Tax (12%)</span>
              <strong>{formatCurrency(quote.tax, quote.currency)}</strong>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold text-purple-700">
                {formatCurrency(quote.total, quote.currency)}
              </span>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Invoice total: {formatCurrency(quote.total, quote.currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
