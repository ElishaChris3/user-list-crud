import clsx from "clsx";

export function RoleBadge({ role }: { role: string }) {
  const styles = clsx(
    "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold shadow-sm transition-colors",
    role === "ADMIN" && "bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700",
    role === "EDITOR" && "bg-gradient-to-r from-sky-100 to-blue-200 text-blue-700",
    role === "VIEWER" && "bg-gradient-to-r from-emerald-100 to-green-200 text-green-700"
  );
  return <span className={styles}>{role}</span>;
}
