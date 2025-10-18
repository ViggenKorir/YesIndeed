"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import MultiStepForm from "./components/MultiStepForm";
import QuotePreview from "./components/QuotePreview";
import AIRecommendationPanel from "./components/AIRecommendationPanel";
import SaveSendPanel from "./components/SaveSendPanel";
import type { ProjectInputs, Quote, QuoteLineItem } from "./components/types";

/**
 * Protected quotations page with Clerk authentication
 * Only accessible to authenticated users
 */

/* -------------------------
   Pricing engine and AI enhancer
   ------------------------- */
const BASE_PRICES: Record<string, number> = {
  website_base: 15000,
  page: 15000,
  ecommerce_base: 60000,
  branding_package: 45000,
  seo_package: 12000,
  cms_integration: 45000,
  payments: 50000,
  auth: 12000,
  admin_dashboard: 18000,
};

function pricingEngine(input: ProjectInputs): Quote {
  const items: QuoteLineItem[] = [];
  const currency = input.currency ?? "KES";
  const now = new Date().toISOString();

  if (input.projectType === "ecommerce") {
    items.push({
      key: "ecommerce_base",
      label: "E-commerce Platform (base)",
      qty: 1,
      unitPrice: BASE_PRICES.ecommerce_base,
      total: BASE_PRICES.ecommerce_base,
    });
  } else if (input.projectType === "branding") {
    items.push({
      key: "branding_package",
      label: "Branding Package",
      qty: 1,
      unitPrice: BASE_PRICES.branding_package,
      total: BASE_PRICES.branding_package,
    });
  } else {
    items.push({
      key: "website_base",
      label: "Website Base",
      qty: 1,
      unitPrice: BASE_PRICES.website_base,
      total: BASE_PRICES.website_base,
    });
  }

  if (input.pages && input.pages > 0) {
    items.push({
      key: "pages",
      label: `Pages (${input.pages})`,
      qty: input.pages,
      unitPrice: BASE_PRICES.page,
      total: BASE_PRICES.page * input.pages,
    });
  }

  for (const f of input.features) {
    if (f === "cms") {
      items.push({
        key: "cms_integration",
        label: "CMS Integration",
        qty: 1,
        unitPrice: BASE_PRICES.cms_integration,
        total: BASE_PRICES.cms_integration,
      });
    } else if (f === "payments") {
      items.push({
        key: "payments",
        label: "Payment Gateway",
        qty: 1,
        unitPrice: BASE_PRICES.payments,
        total: BASE_PRICES.payments,
      });
    } else if (f === "auth") {
      items.push({
        key: "auth",
        label: "Authentication & Authorization",
        qty: 1,
        unitPrice: BASE_PRICES.auth,
        total: BASE_PRICES.auth,
      });
    } else if (f === "admin") {
      items.push({
        key: "admin_dashboard",
        label: "Admin Dashboard",
        qty: 1,
        unitPrice: BASE_PRICES.admin_dashboard,
        total: BASE_PRICES.admin_dashboard,
      });
    }
  }

  let complexityMultiplier = 1;
  if (input.designComplexity === "medium") complexityMultiplier = 1.2;
  if (input.designComplexity === "high") complexityMultiplier = 1.5;

  const timelineMultiplier = input.priority === "expedited" ? 1.25 : 1.0;

  const designExtra = Math.round(50000 * (complexityMultiplier - 1));
  if (designExtra > 0) {
    items.push({
      key: "design_complexity",
      label: `Design (${input.designComplexity})`,
      qty: 1,
      unitPrice: designExtra,
      total: designExtra,
    });
  }

  const rawSubtotalBeforeBuffer = items.reduce((s, it) => s + it.total, 0);
  const contingency = Math.round(rawSubtotalBeforeBuffer * 0.07);
  items.push({
    key: "contingency",
    label: "Contingency Buffer (7%)",
    qty: 1,
    unitPrice: contingency,
    total: contingency,
  });

  const adjustment = Math.round(
    rawSubtotalBeforeBuffer *
      (timelineMultiplier - 1 + (complexityMultiplier - 1) * 0.5),
  );
  if (adjustment > 0) {
    items.push({
      key: "adjustment",
      label: "Timeline & Complexity Adjustment",
      qty: 1,
      unitPrice: adjustment,
      total: adjustment,
    });
  }

  const subtotal = items.reduce((s, it) => s + it.total, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  return {
    id: `q_${Date.now().toString(36)}`,
    currency,
    lineItems: items,
    subtotal,
    tax,
    total,
    aiNotes: undefined,
    confidence: 0.9,
    generatedAt: now,
  };
}

function simulateAIEnhancer(
  input: ProjectInputs,
  base: Quote,
): Promise<{
  suggested: QuoteLineItem[];
  summary: string;
  confidence: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggested: QuoteLineItem[] = [];

      if (!input.features.includes("analytics")) {
        suggested.push({
          key: "analytics",
          label: "Analytics & Tracking Setup",
          qty: 1,
          unitPrice: 20000,
          total: 20000,
          notes: "Recommended for conversion tracking and insights",
        });
      }

      if (
        input.projectType === "ecommerce" &&
        !input.features.includes("fraud")
      ) {
        suggested.push({
          key: "fraud_protection",
          label: "Fraud protection & chargeback defenses",
          qty: 1,
          unitPrice: 45000,
          total: 45000,
          notes: "Recommended for mid-to-high transaction stores",
        });
      }

      resolve({
        suggested,
        summary:
          suggested.length > 0
            ? "We recommend add-ons to improve tracking and risk management."
            : "No immediate add-ons suggested.",
        confidence: 0.88,
      });
    }, 600);
  });
}

/* -------------------------
   Main Page Component with Auth
   ------------------------- */
export default function QuotePage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const [inputs, setInputs] = useState<ProjectInputs>(() => ({
    title: "",
    projectType: "website",
    pages: 5,
    features: ["seo"],
    designComplexity: "medium",
    timelineWeeks: 6,
    priority: "standard",
    targetBudget: null,
    notes: "",
    contactName: "",
    contactEmail: "",
    currency: "KES",
  }));

  const [previewQuote, setPreviewQuote] = useState<Quote | null>(null);
  const [finalQuote, setFinalQuote] = useState<Quote | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<QuoteLineItem[] | null>(
    null,
  );
  const [aiSummary, setAiSummary] = useState<string | undefined>(undefined);
  const [aiConfidence, setAiConfidence] = useState<number | undefined>(
    undefined,
  );
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  // Auth check effect
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Pre-fill user data when loaded
  useEffect(() => {
    if (user) {
      setInputs((prev) => ({
        ...prev,
        contactName: user.fullName || user.firstName || "",
        contactEmail: user.emailAddresses[0]?.emailAddress || "",
      }));
    }
  }, [user]);

  // Update preview quote when inputs change
  useEffect(() => {
    const q = pricingEngine(inputs);
    setPreviewQuote(q);
    setReportReady(false);
  }, [inputs]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
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

  async function handleGenerate() {
    setGenerating(true);
    try {
      const base = pricingEngine(inputs);
      setPreviewQuote(base);

      const ai = await simulateAIEnhancer(inputs, base);
      setAiSuggestions(ai.suggested);
      setAiSummary(ai.summary);
      setAiConfidence(ai.confidence);

      const mergedItems = [...base.lineItems, ...(ai.suggested ?? [])];
      const subtotal = mergedItems.reduce((s, it) => s + it.total, 0);
      const tax = Math.round(subtotal * 0.12);
      const total = subtotal + tax;

      const final: Quote = {
        ...base,
        lineItems: mergedItems,
        subtotal,
        tax,
        total,
        aiNotes: ai.summary,
        confidence: ai.confidence,
      };

      setFinalQuote(final);
      setReportReady(true);

      setTimeout(() => {
        const el = document.getElementById("quote-print-area");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } finally {
      setGenerating(false);
    }
  }

  function handleDownloadPDF() {
    const content = document.getElementById("quote-print-area");
    if (!content) return;
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>Quote — ${inputs.title || "Project"}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  }

  function handleSaveQuote() {
    if (!finalQuote) {
      alert("Please generate a quote before saving.");
      return;
    }
    // TODO: Connect to backend persistence
    alert("Save quote placeholder — connect to backend persistence.");
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-0 text-center">
        Get an Instant Quotation
      </h1>
      <main className=" bg-gray-50 h-full">
        <div className="mx-auto max-w-7xl">
          <header className="mb-6">
            <p className="text-sm text-gray-600 mt-1 text-center">
              Answer a few questions and receive your project quotation.
              <br />
              Use our built in AI-assistant to enhance and pick a suitable
              package. Detailed report is shown after generation.
            </p>
            {user && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="text-cyan-700 font-medium">
                      {user.firstName?.charAt(0) ||
                        user.emailAddresses[0]?.emailAddress.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">
                      {user.fullName || user.firstName || "User"}
                    </p>
                    <p className="text-gray-500">
                      {user.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-0">
            <div className="lg:col-span-2">
              <div className="sticky top-6 space-y-4">
                <MultiStepForm
                  value={inputs}
                  onChange={(p) => setInputs({ ...inputs, ...p })}
                  onGenerate={handleGenerate}
                  generating={generating}
                />
              </div>
            </div>

            <aside className="lg:col-span-2 space-y-4">
              <div id="quote-print-area">
                <QuotePreview
                  quote={
                    reportReady ? (finalQuote ?? previewQuote) : previewQuote
                  }
                  suggestions={aiSuggestions ?? undefined}
                  showFull={reportReady}
                />
              </div>

              <AIRecommendationPanel
                summary={aiSummary}
                items={aiSuggestions ?? undefined}
                confidence={aiConfidence}
              />

              <SaveSendPanel
                quote={finalQuote ?? previewQuote}
                onDownload={handleDownloadPDF}
                onSave={handleSaveQuote}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
