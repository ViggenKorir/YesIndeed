'use client';

import React, { useMemo, KeyboardEvent } from 'react';
import type { ProjectType } from './types';

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  projectType: ProjectType;
};

/**
 * FeatureSelector
 *
 * - Renders a set of feature option buttons depending on the selected project type.
 * - Selected options are highlighted. Clicking (or pressing Enter/Space) toggles a feature.
 * - Keeps the component accessible with aria-pressed and keyboard handlers.
 */
export default function FeatureSelector({ value, onChange, projectType }: Props) {
  const options = useMemo(() => {
    const base = ['cms', 'seo', 'analytics', 'auth'];
    if (projectType === 'ecommerce') {
      return [...base, 'payments', 'shipping', 'inventory', 'fraud'];
    }
    if (projectType === 'webapp') {
      return [...base, 'admin', 'realtime', 'api'];
    }
    return base;
  }, [projectType]);

  function toggle(feature: string) {
    if (value.includes(feature)) {
      onChange(value.filter((v) => v !== feature));
    } else {
      onChange([...value, feature]);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, feature: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(feature);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            onKeyDown={(e) => handleKeyDown(e, opt)}
            aria-pressed={selected}
            className={`px-3 py-1 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${selected ? 'bg-[rgba(130, 182, 62, 0.9)] text-black border-transparent' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
