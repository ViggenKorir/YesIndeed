'use client';

import React from 'react';
import type { Quote } from './types';
import { formatCurrency } from './types';

type Props = {
  quote: Quote | null;
  onDownload: () => void;
  onSave: () => void;
  onSend?: () => void;
};

/**
 * SaveSendPanel
 *
 * Presentational panel with primary actions for the quotations page:
 * - Save Quote (persist to backend)
 * - Download PDF (print / server-side PDF)
 * - Send Email (optional)
 *
 * Buttons are disabled when there's no generated quote.
 */
export default function SaveSendPanel({ quote, onDownload, onSave, onSend }: Props) {
  const hasQuote = Boolean(quote);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={!hasQuote}
            className={`px-4 py-2 rounded-full font-medium transition ${
              hasQuote
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!hasQuote}
            aria-label="Save quote"
          >
            Save Quote
          </button>

          <button
            type="button"
            onClick={onDownload}
            disabled={!hasQuote}
            className={`px-4 py-2 rounded-full font-medium transition ${
              hasQuote
                ? 'bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:opacity-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!hasQuote}
            aria-label="Download quote PDF"
          >
            Download PDF
          </button>

          {onSend && (
            <button
              type="button"
              onClick={onSend}
              disabled={!hasQuote}
              className={`px-3 py-2 rounded-full font-medium transition ${
                hasQuote ? 'border border-purple-600 text-purple-700 bg-white hover:bg-purple-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-disabled={!hasQuote}
              aria-label="Send quote by email"
            >
              Send Email
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600">
          {hasQuote ? (
            <div className="text-right">
              <div>
                <span className="text-xs text-gray-500">Total:&nbsp;</span>
                <span className="font-medium">{formatCurrency(quote!.total, quote!.currency)}</span>
              </div>
              <div className="text-xs text-gray-400">Branded PDF & emailing coming soon</div>
            </div>
          ) : (
            <div className="text-xs text-gray-500">Generate a quote to enable actions.</div>
          )}
        </div>
      </div>
    </div>
  );
}
