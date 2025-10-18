"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";

/**
 * Reusable Alert system
 *
 * Exports:
 * - AlertProvider: wraps app and renders toasts in top-right corner.
 * - useAlert(): hook that exposes `notify` and `dismiss` helpers.
 *
 * Features:
 * - Toasts support variants: success | info | warning | error
 * - Auto-dismiss with configurable duration (ms). 0 = persistent.
 * - Manual dismiss via close button.
 * - Dismiss all / individual.
 * - Accessible: aria-live="polite", role="status"
 *
 * Usage:
 * 1. Wrap your application with <AlertProvider>
 * 2. Call `const { notify } = useAlert()` inside client components.
 *
 * Example:
 * const { notify } = useAlert();
 * notify({ title: "Saved", description: "Draft saved", variant: "success" });
 */

/* ============================
   Types
   ============================ */
export type AlertVariant = "success" | "info" | "warning" | "error";

export type AlertOptions = {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  duration?: number; // milliseconds; default 6000; 0 = persistent
};

export type AlertItem = {
  id: string;
  title?: string;
  description?: string;
  variant: AlertVariant;
  duration: number;
  createdAt: number;
};

/* ============================
   Context
   ============================ */
type AlertContextValue = {
  notify: (opts: AlertOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  alerts: AlertItem[];
};

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

/* ============================
   Hooks
   ============================ */
export const useAlert = (): AlertContextValue => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return ctx;
};

/* ============================
   Icons
   ============================ */
const IconFor = ({ variant }: { variant: AlertVariant }) => {
  const common = "h-5 w-5";
  switch (variant) {
    case "success":
      return <CheckCircle className={`${common} text-emerald-600`} />;
    case "info":
      return <Info className={`${common} text-sky-600`} />;
    case "warning":
      return <AlertTriangle className={`${common} text-amber-600`} />;
    case "error":
      return <XCircle className={`${common} text-rose-600`} />;
    default:
      return <Info className={`${common} text-sky-600`} />;
  }
};

/* ============================
   Provider
   ============================ */
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const counter = useRef(0);

  const notify = (opts: AlertOptions) => {
    const id = `a-${Date.now().toString(36)}-${counter.current++}`;
    const item: AlertItem = {
      id,
      title: opts.title,
      description: opts.description,
      variant: opts.variant ?? "info",
      duration: typeof opts.duration === "number" ? opts.duration : 6000,
      createdAt: Date.now(),
    };
    setAlerts((prev) => [item, ...prev]);
    return id;
  };

  const dismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const dismissAll = () => {
    setAlerts([]);
  };

  const value = useMemo(
    () => ({
      notify,
      dismiss,
      dismissAll,
      alerts,
    }),
    [alerts],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertPortal
        alerts={alerts}
        onDismiss={dismiss}
        onDismissAll={dismissAll}
      />
    </AlertContext.Provider>
  );
};

/* ============================
   Portal + Toast rendering
   ============================ */

const AlertPortal = ({
  alerts,
  onDismiss,
  onDismissAll,
}: {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}) => {
  // Ensure portal root exists (creates a container element on the document body)
  const elRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof document === "undefined") return;
    let el = document.getElementById("app-alert-portal") as HTMLElement | null;
    if (!el) {
      el = document.createElement("div");
      el.id = "app-alert-portal";
      document.body.appendChild(el);
    }
    elRef.current = el;
    return () => {
      // keep it — shared root across provider mounts
    };
  }, []);

  if (typeof document === "undefined" || !elRef.current) {
    // SSR safe: render nothing on server
    return null;
  }

  return createPortal(
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-50 flex max-w-xs flex-col gap-3 sm:max-w-md"
    >
      <div className="flex items-center justify-end gap-2">
        {alerts.length > 0 && (
          <button
            onClick={onDismissAll}
            className="text-xs text-muted-foreground hover:text-foreground transition rounded px-2 py-1"
            aria-label="Dismiss all alerts"
            title="Dismiss all"
          >
            Clear all
          </button>
        )}
      </div>

      {alerts.map((a) => (
        <Toast key={a.id} alert={a} onClose={() => onDismiss(a.id)} />
      ))}
    </div>,
    elRef.current,
  );
};

/* ============================
   Toast component
   ============================ */

const Toast = ({
  alert,
  onClose,
}: {
  alert: AlertItem;
  onClose: () => void;
}) => {
  const { id, title, description, variant, duration } = alert;
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100); // percent of remaining time
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // show
    const enter = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(enter);
  }, []);

  useEffect(() => {
    if (duration === 0) return; // persistent
    let rafId: number;
    let start: number | null = null;
    startRef.current = Date.now();

    const total = duration ?? 6000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const remaining = Math.max(0, total - elapsed);
      setProgress((remaining / total) * 100);
      if (elapsed < total) {
        rafId = requestAnimationFrame(step);
      } else {
        // auto-dismiss
        setVisible(false);
        // give exit transition time
        setTimeout(onClose, 260);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const bgClass =
    variant === "success"
      ? "bg-emerald-50 border-emerald-100"
      : variant === "info"
        ? "bg-sky-50 border-sky-100"
        : variant === "warning"
          ? "bg-amber-50 border-amber-100"
          : "bg-rose-50 border-rose-100";

  const ringClass =
    variant === "success"
      ? "ring-emerald-300/40"
      : variant === "info"
        ? "ring-sky-300/40"
        : variant === "warning"
          ? "ring-amber-300/40"
          : "ring-rose-300/40";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`pointer-events-auto w-full transform transition-all duration-200 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-lg border p-3 shadow-sm ${bgClass} ring-1 ${ringClass}`}
      >
        <div className="flex gap-3">
          <div className="flex items-start">
            <div className="mt-0.5">
              <IconFor variant={variant} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {title && <div className="font-semibold text-sm">{title}</div>}
            {description && (
              <div className="mt-1 text-xs text-muted-foreground">
                {description}
              </div>
            )}
            {!title && !description && (
              <div className="text-sm text-muted-foreground">Notification</div>
            )}
          </div>

          <div className="flex items-start ml-2">
            <button
              onClick={handleClose}
              aria-label={`Close notification ${title ?? ""}`}
              className="inline-flex rounded p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* progress bar */}
        {duration !== 0 && (
          <div className="absolute left-0 bottom-0 h-0.5 w-full bg-black/5">
            <div
              style={{ width: `${progress}%` }}
              className={`h-0.5 transition-[width] duration-100 linear ${
                variant === "success"
                  ? "bg-emerald-600"
                  : variant === "info"
                    ? "bg-sky-600"
                    : variant === "warning"
                      ? "bg-amber-600"
                      : "bg-rose-600"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertProvider;
