import { useStore } from "../store/useStore";

function RoleSwitcher() {
  const { role, setRole } = useStore();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-200">Role Simulation</p>
          <p className="text-sm text-slate-600 dark:text-slate-50">
            {role === "admin"
              ? "Admin can add and edit transactions."
              : "Viewer has read-only access."}
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-slate-300 p-1 dark:border-slate-600">
          <button
            type="button"
            onClick={() => setRole("viewer")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              role === "viewer"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            Viewer
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              role === "admin"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSwitcher;