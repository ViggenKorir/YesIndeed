import React, { useState } from "react";
import type { ProjectInputs } from "./types";
import ProgressTracker from "./ProgressTracker";
import Field from "./Field";
import FeatureSelector from "./FeatureSelector";

/**
 * MultiStepForm
 *
 * Extracted multi-step form used on the quotations page.
 * - Keeps internal step index state
 * - Exposes `onChange` patches to the parent for the ProjectInputs state
 * - Calls `onGenerate` when user completes the final step
 *
 * Props:
 * - value: current ProjectInputs state (controlled by parent)
 * - onChange: function to apply a partial patch to ProjectInputs
 * - onGenerate: async function invoked to generate the final quote
 * - generating: boolean flag to indicate generation in progress
 */
type Props = {
  value: ProjectInputs;
  onChange: (patch: Partial<ProjectInputs>) => void;
  onGenerate: () => Promise<void>;
  generating: boolean;
};

export default function MultiStepForm({
  value,
  onChange,
  onGenerate,
  generating,
}: Props) {
  const steps = ["Project", "Features", "Design", "Timeline", "Budget"];
  const [stepIndex, setStepIndex] = useState<number>(0);

  function next() {
    setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    setStepIndex((s) => Math.max(s - 1, 0));
  }

  return (
    <div>
      <ProgressTracker
        step={stepIndex + 1}
        total={steps.length}
        className="mb-6"
      />

      <div className="bg-white rounded shadow p-5">
        <h2 className="text-lg font-semibold mb-3">{steps[stepIndex]}</h2>

        {stepIndex === 0 && (
          <>
            <Field label="Project title" id="project-title" required>
              <input
                id="project-title"
                className="w-full border px-3 py-2 rounded"
                value={value.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="E.g., Redesign & e-commerce"
                aria-label="Project title"
              />
            </Field>

            <Field label="Project type" id="project-type">
              <select
                id="project-type"
                className="w-full border px-3 py-2 rounded"
                value={value.projectType}
                onChange={(e) =>
                  onChange({
                    projectType: e.target.value as ProjectInputs["projectType"],
                  })
                }
                aria-label="Project type"
              >
                <option value="website">Website</option>
                <option value="ecommerce">E-commerce</option>
                <option value="webapp">Web App</option>
                <option value="branding">Branding</option>
                <option value="seo">SEO</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field
              label="Pages (approx.)"
              hint="Approximate number of unique page templates"
              id="pages"
            >
              <input
                id="pages"
                type="number"
                min={1}
                className="w-32 border px-3 py-2 rounded"
                value={value.pages}
                onChange={(e) =>
                  onChange({ pages: Math.max(0, Number(e.target.value || 0)) })
                }
                aria-label="Number of pages"
              />
            </Field>
          </>
        )}

        {stepIndex === 1 && (
          <>
            <Field
              label="Select features"
              hint="Pick the core features you need"
              id="features"
            >
              <FeatureSelector
                projectType={value.projectType}
                value={value.features}
                onChange={(features) => onChange({ features })}
              />
            </Field>
          </>
        )}

        {stepIndex === 2 && (
          <>
            <Field label="Design complexity" id="design-complexity">
              <div
                className="flex gap-2"
                role="radiogroup"
                aria-label="Design complexity"
              >
                {(
                  [
                    "low",
                    "medium",
                    "high",
                  ] as ProjectInputs["designComplexity"][]
                ).map((c) => {
                  const active = value.designComplexity === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onChange({ designComplexity: c })}
                      aria-pressed={active}
                      className={`px-3 py-2 rounded border focus:outline-none focus:ring-2 ${active ? "bg-[rgba(130, 182, 62, 0.9)] text-black" : "bg-white"}`}
                    >
                      {c[0].toUpperCase() + c.slice(1)}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Notes" id="notes">
              <textarea
                id="notes"
                className="w-full border rounded px-3 py-2"
                rows={4}
                value={value.notes ?? ""}
                onChange={(e) => onChange({ notes: e.target.value })}
                placeholder="Any important constraints or examples?"
                aria-label="Project notes"
              />
            </Field>
          </>
        )}

        {stepIndex === 3 && (
          <>
            <Field label="Timeline (weeks)" id="timeline-weeks">
              <input
                id="timeline-weeks"
                type="number"
                min={1}
                className="w-32 border px-3 py-2 rounded"
                value={value.timelineWeeks}
                onChange={(e) =>
                  onChange({
                    timelineWeeks: Math.max(1, Number(e.target.value || 1)),
                  })
                }
                aria-label="Timeline in weeks"
              />
            </Field>

            <Field label="Priority" id="priority">
              <div
                className="flex gap-2"
                role="radiogroup"
                aria-label="Project priority"
              >
                <label
                  className={`px-3 py-2 rounded border ${value.priority === "standard" ? "bg-[rgba(130, 182, 62, 0.9)] text-black" : "bg-white"}`}
                >
                  <input
                    type="radio"
                    name="priority"
                    className="hidden"
                    checked={value.priority === "standard"}
                    onChange={() => onChange({ priority: "standard" })}
                    aria-label="Standard priority"
                  />
                  Standard
                </label>

                <label
                  className={`px-3 py-2 rounded border ${value.priority === "expedited" ? "bg-yellow-500 text-white" : "bg-white"}`}
                >
                  <input
                    type="radio"
                    name="priority"
                    className="hidden"
                    checked={value.priority === "expedited"}
                    onChange={() => onChange({ priority: "expedited" })}
                    aria-label="Expedited priority"
                  />
                  Expedited
                </label>
              </div>
            </Field>
          </>
        )}

        {stepIndex === 4 && (
          <>
            <Field label="Target budget (optional)" id="target-budget">
              <input
                id="target-budget"
                type="number"
                className="w-48 border px-3 py-2 rounded"
                value={value.targetBudget ?? ""}
                onChange={(e) =>
                  onChange({
                    targetBudget: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                placeholder="e.g., 150,000"
                aria-label="Target budget"
              />
            </Field>

            <Field label="Contact email" id="contact-email">
              <input
                id="contact-email"
                type="email"
                className="w-full border px-3 py-2 rounded"
                value={value.contactEmail ?? ""}
                onChange={(e) => onChange({ contactEmail: e.target.value })}
                placeholder="name@company.com"
                aria-label="Contact email"
              />
            </Field>
          </>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={stepIndex === 0}
              className="px-3 py-2 border rounded disabled:opacity-50"
              aria-disabled={stepIndex === 0}
            >
              Back
            </button>

            {stepIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="px-3 py-2 bg-gradient-to-r from-green-900 to-green-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  // call and ignore result (parent manages generating state)
                  void onGenerate();
                }}
                disabled={generating}
                className="px-3 py-2 bg-[rgba(130,182,62,0.9)] text-black border rounded"
                aria-disabled={generating}
              >
                {generating ? "Generating..." : "Generate Quote"}
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500">
            All estimates are preliminary and subject to discovery.
          </div>
        </div>
      </div>
    </div>
  );
}
