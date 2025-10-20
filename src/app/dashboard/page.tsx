"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/dashboard/components/Header";
import KPIGrid from "@/app/dashboard/components/KPIGrid";
import ProjectsList from "@/app/dashboard/components/ProjectsList";
import PipelinePreview from "@/app/dashboard/components/PipelinePreview";
import ContactsList from "@/app/dashboard/components/ContactsList";
import TeamTasks from "@/app/dashboard/components/TeamTasks";
import AdminPanel from "@/app/dashboard/components/AdminPanel";
import { Card } from "@/components/ui/card";
import { useAlert } from "@/components/ui/Alert";
import {
  sampleData,
  canView,
  Role,
  type KPI,
  type Project,
  type Deal,
  type Contact,
  type Task,
} from "@/app/dashboard/utils";

/**
 * Dashboard route (refactored)
 *
 * - Imports extracted components from `src/app/dashboard/components/*`
 * - Implements a client-side route protection placeholder. Replace with
 *   your real auth integration to enforce access control server-side.
 * - Uses the Hero palette (dark -> green accents) via component styles.
 *
 * Notes on route protection:
 * - This file uses a simulated auth check. For production, perform auth checks
 *   on the server (getServerSideProps / server component) or protect API endpoints.
 * - The redirect uses next/navigation router.replace to navigate unauthorized users.
 */

/* Small simulated auth helper — replace with your real auth hook */
const simulateAuthCheck = async (): Promise<{
  authenticated: boolean;
  role?: Role;
}> => {
  // Simulate a small delay like a real auth check
  await new Promise((r) => setTimeout(r, 250));
  // TODO: Replace with real auth logic (cookies, tokens, session)
  // For demo: user is signed in and has role "manager"
  return { authenticated: true, role: "manager" };
};

export default function DashboardPage() {
  const router = useRouter();
  const { notify } = useAlert();

  // Auth state
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Role>("viewer");

  // Dashboard state (demo data)
  const [kpis] = useState<KPI[]>(sampleData.kpis);
  const [projects] = useState<Project[]>(sampleData.projects);
  const [deals, setDeals] = useState<Deal[]>(sampleData.deals);
  const [contacts] = useState<Contact[]>(sampleData.contacts);
  const [tasks, setTasks] = useState<Task[]>(sampleData.tasks);

  // Run auth check on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await simulateAuthCheck();
        if (!mounted) return;
        if (!result.authenticated) {
          // Not authenticated -> redirect to login
          notify({
            title: "Authentication required",
            description: "Please sign in to access the dashboard.",
            variant: "info",
            duration: 4000,
          });
          router.replace("/login");
        } else {
          setAuthenticated(true);
          if (result.role) setRole(result.role);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        notify({
          title: "Auth error",
          description: "Unable to verify authentication at this time.",
          variant: "warning",
        });
      } finally {
        if (mounted) setCheckingAuth(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If we're still checking, show a lightweight skeleton/placeholder
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 w-full max-w-2xl text-center">
          <h3 className="text-lg font-semibold">Checking access...</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Validating your session and permissions.
          </p>
        </Card>
      </div>
    );
  }

  // If not authenticated, we've already redirected — render nothing
  if (!authenticated) {
    return null;
  }

  /* ---------------------------
     Action handlers (delegate to real APIs in production)
     --------------------------- */

  const openProject = (p: Project) => {
    notify({
      title: "Open project",
      description: `Opening ${p.name} (simulated)`,
      variant: "info",
    });
    // Replace with router.push or project modal
  };

  const moveDeal = (id: string, dir: -1 | 1) => {
    setDeals((prev) => {
      const next = prev.map((d) =>
        d.id === id
          ? { ...d, stage: dir > 0 ? "Next Stage" : "Previous Stage" }
          : d,
      );
      return next;
    });
    notify({
      title: "Deal updated",
      description: "Deal stage updated (simulated)",
      variant: "success",
    });
  };

  const messageContact = (c: Contact) => {
    notify({
      title: "Message sent",
      description: `Message sent to ${c.name} (simulated)`,
      variant: "success",
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    notify({
      title: "Task updated",
      description: "Task updated (simulated)",
      variant: "info",
    });
  };

  const promoteUser = (id: string) => {
    notify({
      title: "User promoted",
      description: `${id} promoted (simulated)`,
      variant: "success",
    });
  };

  const revokeUser = (id: string) => {
    notify({
      title: "User revoked",
      description: `${id} access revoked (simulated)`,
      variant: "warning",
    });
  };

  /* ---------------------------
     Rendering layout
     --------------------------- */

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        <Header
          role={role}
          onRoleChange={(r) => {
            setRole(r);
            notify({
              title: "Role switched",
              description: `Viewing as ${r}`,
              variant: "info",
            });
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* KPI strip */}
            {canView(role, "kpis") && <KPIGrid items={kpis} />}

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {canView(role, "pipeline") && (
                <div className="md:col-span-1">
                  <PipelinePreview
                    deals={deals}
                    role={role}
                    onMove={moveDeal}
                  />
                </div>
              )}

              {canView(role, "projects") && (
                <div className="md:col-span-1">
                  <ProjectsList
                    projects={projects}
                    onOpen={openProject}
                    role={role}
                  />
                </div>
              )}

              <div className="md:col-span-1">
                {canView(role, "tasks") ? (
                  <TeamTasks tasks={tasks} role={role} onToggle={toggleTask} />
                ) : (
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold">Tasks</h3>
                    <p className="text-sm text-muted-foreground">
                      You have read-only access to tasks.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            {canView(role, "contacts") ? (
              <ContactsList
                contacts={contacts}
                role={role}
                onMessage={messageContact}
              />
            ) : (
              <Card className="p-4">
                <h3 className="text-lg font-semibold">Contacts</h3>
                <p className="text-sm text-muted-foreground">
                  Access restricted for your role.
                </p>
              </Card>
            )}

            {canView(role, "adminPanel") ? (
              <AdminPanel
                currentRole={role}
                onPromote={(id, _newRole) => promoteUser(id)}
                onRevoke={(id) => revokeUser(id)}
              />
            ) : null}

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="text-sm text-muted-foreground">Live</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-100 p-2">
                    <svg
                      className="h-5 w-5 text-slate-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 2v6l4-2"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Production deployed</div>
                    <div className="text-xs text-muted-foreground">
                      Deployed by Alice • 2h ago
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-emerald-50 p-2">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">New client onboarded</div>
                    <div className="text-xs text-muted-foreground">
                      Added to CRM
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-rose-50 p-2">
                    <svg
                      className="h-5 w-5 text-rose-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Credentials revoked</div>
                    <div className="text-xs text-muted-foreground">
                      Security rotation
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
