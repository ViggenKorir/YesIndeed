/**
 * Invoice component shared types and lightweight helpers
 *
 * Purpose:
 * - Centralize TypeScript types used by the invoice UI components.
 * - Provide small pure helpers (totals + currency formatting) so components can import a single source of truth.
 *
 * Note: Keep helpers minimal here. Business logic (persistence, PDF generation, emailing) should live in
 * backend routes or a separate service layer.
 */

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface LineItem {
  id: string; // stable identifier (client-side or DB)
  description: string;
  qty: number;
  unitPrice: number; // numeric value in smallest currency unit is acceptable; here we use decimal numbers (e.g., 1299.5)
  taxExempt?: boolean; // optional flag to exclude this item from tax calculations
  meta?: Record<string, unknown>; // optional extensibility field (e.g., SKU, serviceKey)
}

export type InvoiceStatus = 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'cancelled';

export interface Invoice {
  id: string;
  number: string; // human-readable invoice number, e.g. INV-2025-001
  clientName: string;
  clientEmail?: string;
  createdAt: string; // ISO date string (YYYY-MM-DD or full ISO)
  dueDate?: string; // ISO date string
  currency: Currency;
  items: LineItem[];
  paid: boolean;
  status?: InvoiceStatus;
  notes?: string;
  issuedBy?: string; // agency or user who issued invoice
  terms?: string;
  meta?: Record<string, unknown>;
}

/**
 * Totals returned by the calculateTotals helper.
 */
export interface InvoiceTotals {
  subtotal: number;
  tax: number;
  total: number;
  taxRate: number;
}

/**
 * Default tax rate used by components when none is supplied (12% for demo/prototype).
 * In production, tax rate should be configurable per-organization and per-invoice.
 */
export const DEFAULT_TAX_RATE = 0.12;

/**
 * calculateTotals
 *
 * Pure helper that computes subtotal, tax and grand total.
 * - Excludes items with qty <= 0 from subtotal.
 * - Respects item.taxExempt to omit specific items from tax calculation.
 *
 * Usage:
 *   const totals = calculateTotals(invoice.items, 0.12);
 */
export function calculateTotals(items: LineItem[], taxRate = DEFAULT_TAX_RATE): InvoiceTotals {
  const validItems = items.filter((it) => Number(it.qty) > 0 && Number(it.unitPrice) >= 0);
  const subtotal = validItems.reduce((sum, it) => sum + it.qty * it.unitPrice, 0);

  const taxableAmount = validItems
    .filter((it) => !it.taxExempt)
    .reduce((sum, it) => sum + it.qty * it.unitPrice, 0);

  const tax = Math.round((taxableAmount * taxRate + Number.EPSILON) * 100) / 100; // round to 2 decimals
  const total = Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;

  return { subtotal, tax, total, taxRate };
}

/**
 * formatCurrency
 *
 * Lightweight currency formatter wrapper. Uses Intl.NumberFormat and falls back to a simple interpolation on error.
 *
 * Example:
 *   formatCurrency(1234.5, 'USD') => "$1,234.50"
 */
export function formatCurrency(value: number, currency: Currency, locale = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    // Fallback - keep it simple
    return `${currency} ${value.toFixed(2)}`;
  }
}
