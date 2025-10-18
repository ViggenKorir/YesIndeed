'use client';

import React from 'react';

interface FieldProps {
  id?: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

/**
 * Field
 *
 * A small presentational wrapper used across the quotation form to:
 * - Render a label for form controls
 * - Provide a hint/help text
 * - Display validation error messages
 *
 * Props:
 * - id: optional id to connect the label with an input (useful for accessibility)
 * - label: visible field label
 * - children: the form control (input, select, textarea, etc.)
 * - hint: optional hint/help text shown under the control
 * - error: optional error message rendered in red
 * - required: if true, a required marker (*) is shown in the label
 * - className: optional container className for layout adjustments
 */
export default function Field({
  id,
  label,
  children,
  hint,
  error,
  required = false,
  className = '',
}: FieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
        aria-hidden={false}
      >
        <span className="inline-flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-red-500" aria-hidden>*</span>}
        </span>
      </label>

      <div>{children}</div>

      {hint && !error && (
        <p className="text-xs text-gray-400 mt-1" role="note">
          {hint}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-1" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
}
