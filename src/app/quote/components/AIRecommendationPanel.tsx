"use client";

import React, { useState } from "react";
import type { QuoteLineItem } from "./types";
import { formatCurrency } from "./types";

type Props = {
  summary?: string;
  items?: QuoteLineItem[] | null;
  confidence?: number;
  /**
   * Optional callback invoked when a suggestion is accepted or removed.
   * Receives (key: string, accepted: boolean).
   */
  onAcceptSuggestion?: (key: string, accepted: boolean) => void;
};

/**
 * AIRecommendationPanel
 *
 * Presentational + small-interaction component that displays AI-suggested add-ons,
 * a short summary and a confidence indicator. Consumers can provide an
 * optional `onAcceptSuggestion` callback to receive accept/remove events.
 *
 * This component intentionally keeps its internal state minimal: it only tracks
 * which suggestions the user has accepted locally and notifies the parent.
 */
export default function AIRecommendationPanel({
  summary,
  items,
  confidence,
  onAcceptSuggestion,
}: Props) {
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});

  function toggleAccept(key: string) {
    const next = !accepted[key];
    setAccepted((prev) => ({ ...prev, [key]: next }));
    if (onAcceptSuggestion) onAcceptSuggestion(key, next);
  }

  return (
    <aside className="bg-white rounded shadow p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-md font-medium text-gray-800">
            AI Recommendations
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {summary ?? "No recommendations yet."}
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500">AI confidence</div>
          <div className="text-sm font-medium text-gray-700">
            {typeof confidence === "number"
              ? `${Math.round(confidence * 100)}%`
              : "—"}
          </div>
        </div>
      </div>

      {items && items.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {items.map((it) => {
            const isAccepted = Boolean(accepted[it.key]);
            return (
              <li
                key={it.key}
                className={`flex items-center justify-between gap-3 p-3 rounded border ${isAccepted ? "bg-purple-50 border-purple-200" : "bg-yellow-50 border-yellow-100"}`}
              >
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {it.label}
                      </div>
                      {it.notes && (
                        <div className="text-xs text-gray-600 mt-1">
                          {it.notes}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(it.total)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ({it.qty} × {formatCurrency(it.unitPrice)})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-3">
                  <button
                    type="button"
                    onClick={() => toggleAccept(it.key)}
                    className={`px-3 py-1 text-sm rounded ${isAccepted ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-white border text-gray-800 hover:bg-gray-50"}`}
                    aria-pressed={isAccepted}
                    aria-label={`${isAccepted ? "Remove" : "Accept"} suggestion ${it.label}`}
                  >
                    {isAccepted ? "Accepted" : "Add"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4 text-sm text-gray-500">
          No add-ons suggested for the selected options.
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        Recommendations are generated automatically — review and accept any
        add-ons you&apos;d like included in the final quote.
      </div>
    </aside>
  );
}
