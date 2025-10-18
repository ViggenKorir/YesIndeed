/**
 * Quote types and small pure helpers for the quotations UI.
 *
 * Location: YesIndeed/src/app/quote/components/types.ts
 *
 * Purpose:
 * - Centralize TypeScript types for the quote UI and pricing engine.
 * - Provide lightweight helpers (currency formatting, totals calculation).
 *
 * Notes:
 * - Keep business logic (persistence, PDF generation, AI calls) out of this file.
 * - Helpers are pure and easily testable.
 */

export type ProjectType =
  | "website"
  | "ecommerce"
  | "webapp"
  | "branding"
  | "seo"
  | "other";
export type Complexity = "low" | "medium" | "high";

export type Currency = "KES" | "USD" | "EUR" | "GBP";

/**
 * Structured input that the multi-step quote form produces.
 * Keep fields minimal and serializable so they can be persisted or passed to APIs.
 */
export interface ProjectInputs {
  title: string;
  projectType: ProjectType;
  pages: number;
  features: string[]; // e.g. ['cms', 'payments', 'auth']
  designComplexity: Complexity;
  timelineWeeks: number;
  priority: "standard" | "expedited";
  targetBudget?: number | null;
  notes?: string;
  contactName?: string;
  contactEmail?: string;
  currency?: Currency;
}

/**
 * Single line item in a quote.
 */
export interface QuoteLineItem {
  key: string; // stable internal key, e.g. 'cms_integration'
  label: string; // human-readable label shown to users
  qty: number;
  unitPrice: number; // numeric amount in the chosen currency
  total: number; // qty * unitPrice (can include adjustments)
  notes?: string; // optional explanatory text
  meta?: Record<string, unknown>; // extensibility for SKU, serviceKey, etc.
}

/**
 * Canonical Quote object returned by the pricing engine or the server.
 */
export interface Quote {
  id: string;
  currency: Currency;
  lineItems: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  aiNotes?: string;
  confidence?: number; // 0-1
  generatedAt: string; // ISO date string
  meta?: Record<string, unknown>;
}

/**
 * Totals returned by `calculateTotals`.
 */
export interface QuoteTotals {
  subtotal: number;
  tax: number;
  total: number;
  taxRate: number;
}

/**
 * Default tax rate used by components when none is supplied (12% for demo/prototype).
 * In production, tax rates should be configurable per-organization / region.
 */
export const DEFAULT_TAX_RATE = 0.12;

/**
 * calculateTotals
 *
 * Pure helper that computes subtotal, tax and grand total:
 * - Excludes items with qty <= 0 from subtotal.
 * - Respects `taxExempt` in the item meta (if present and truthy) to omit specific items from tax.
 *
 * Returns a QuoteTotals object with numbers rounded to 2 decimals.
 */
export function calculateTotals(
  items: QuoteLineItem[],
  taxRate = DEFAULT_TAX_RATE,
): QuoteTotals {
  const validItems = items.filter(
    (it) => Number(it.qty) > 0 && Number(it.unitPrice) >= 0,
  );

  const subtotal = validItems.reduce(
    (sum, it) => sum + it.qty * it.unitPrice,
    0,
  );

  const taxableAmount = validItems
    .filter((it) => !(it.meta && (it.meta as any).taxExempt))
    .reduce((sum, it) => sum + it.qty * it.unitPrice, 0);

  const rawTax = taxableAmount * taxRate;
  const tax = Math.round((rawTax + Number.EPSILON) * 100) / 100;
  const total = Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;

  return { subtotal, tax, total, taxRate };
}

/**
 * formatCurrency
 *
 * Lightweight currency formatter wrapper. Uses Intl.NumberFormat and falls back to a safe string on error.
 *
 * Example:
 *   formatCurrency(1234.5, 'KES') => "KSh 1,234.50" (depending on locale support)
 */
export function formatCurrency(
  value: number,
  currency: Currency = "KES",
  locale = "en-KE",
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

// Backwards-compatible alias:
// Some components/files (historic or imported code) use the name `currencyFormat`.
// Export an alias so both `formatCurrency` and `currencyFormat` are available.
export const currencyFormat = formatCurrency;
