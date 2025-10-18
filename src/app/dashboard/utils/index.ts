/**
 * Dashboard utilities
 * - Types, sample data, permission checker, and currency formatter
 *
 * This file is intentionally framework-agnostic and can be imported from
 * both server and client code. Replace sample data with API-driven data
 * when integrating with your backend.
 */

/* -------------------------
   Types
   ------------------------- */
export type Role = "admin" | "manager" | "developer" | "sales" | "viewer";

export type KPI = {
  id: string;
  label: string;
  value: string;
  trend?: string;
};

export type Project = {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  owner: string;
  budget: number; // amount in KES
};

export type Deal = {
  id: string;
  title: string;
  company?: string;
  amount: number; // KES
  stage?: string;
};

export type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
};

export type Task = {
  id: string;
  title: string;
  assignee?: string;
  due?: string; // ISO date or human readable
  completed?: boolean;
};

/* -------------------------
   Helpers
   ------------------------- */

/**
 * Simple unique id generator for demo data.
 * For production replace with server-generated IDs or a robust uuid lib.
 */
export const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 9)}`;

/**
 * Formatter for Kenyan Shilling (KES).
 * Use formatKES(amountInKES).
 */
const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export const formatKES = (amount: number) => currencyFormatter.format(amount);

/* -------------------------
   Role-based access control
   ------------------------- */

/**
 * canView(role, area) -> boolean
 * Centralized permission map for dashboard sections.
 * Extend or replace with a policy-based system or integrate with your auth provider.
 */
const permissionMap: Record<string, Role[]> = {
  kpis: ["admin", "manager", "viewer"],
  pipeline: ["admin", "manager", "sales"],
  projects: ["admin", "manager", "developer"],
  tasks: ["admin", "manager", "developer"],
  contacts: ["admin", "manager", "sales"],
  adminPanel: ["admin"],
  billing: ["admin", "manager"],
  reports: ["admin", "manager", "viewer"],
};

export const canView = (role: Role, area: string) => {
  const allowed = permissionMap[area];
  if (!allowed) return false;
  return allowed.includes(role);
};

/* -------------------------
   Sample data (demo only)
   ------------------------- */

/**
 * Sample KPIs - simple presentational values
 */
export const sampleKPIs: KPI[] = [
  { id: "k1", label: "Monthly Revenue", value: formatKES(420000), trend: "+8%" },
  { id: "k2", label: "Active Projects", value: "12", trend: "+2" },
  { id: "k3", label: "Open Deals", value: "7", trend: "-1" },
  { id: "k4", label: "New Leads (30d)", value: "64", trend: "+12%" },
];

/**
 * Sample projects (budgets in KES)
 */
export const sampleProjects: Project[] = [
  { id: "p1", name: "Website Redesign for A", status: "active", owner: "Alice", budget: 150000 },
  { id: "p2", name: "Mobile App for B", status: "paused", owner: "Ben", budget: 200000 },
  { id: "p3", name: "Marketing Site C", status: "active", owner: "Carol", budget: 80000 },
];

/**
 * Sample deals
 */
export const sampleDeals: Deal[] = [
  { id: "d1", title: "Enterprise Package - X", company: "X Corp", amount: 500000, stage: "Qualified" },
  { id: "d2", title: "Annual Subscription - Y", company: "Y LLC", amount: 180000, stage: "Demo Scheduled" },
  { id: "d3", title: "Website Build - Z", company: "Z Ltd", amount: 90000, stage: "Proposal Made" },
];

/**
 * Sample contacts
 */
export const sampleContacts: Contact[] = [
  { id: "c1", name: "Benjamin Leon", email: "benjamin.leon@gmial.com", phone: "785-202-7824", company: "Benjamin Leon" },
  { id: "c2", name: "Tony Turner", email: "tony.turner@movefr.com", phone: "218-348-8528", company: "[Sample] MoveEr" },
  { id: "c3", name: "Phyllis Yang", email: "phyllis.yang@gmial.com", phone: "240-707-3864", company: "[Sample] Phyllis & Cie" },
];

/**
 * Sample tasks
 */
export const sampleTasks: Task[] = [
  { id: "t1", title: "Refactor landing hero", assignee: "Dev Team", due: "2025-10-20", completed: false },
  { id: "t2", title: "Client feedback review", assignee: "Alice", due: "2025-10-18", completed: false },
  { id: "t3", title: "QA: Payment flow", assignee: "Ben", due: "2025-10-22", completed: true },
];

/* -------------------------
   Export convenience
   ------------------------- */

export const sampleData = {
  kpis: sampleKPIs,
  projects: sampleProjects,
  deals: sampleDeals,
  contacts: sampleContacts,
  tasks: sampleTasks,
};
