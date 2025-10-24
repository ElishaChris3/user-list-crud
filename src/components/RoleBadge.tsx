import clsx from "clsx";

export function RoleBadge({ role }: { role: string }) {
  const styles = clsx(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
    role === "ADMIN" && "bg-red-50 text-red-700 ring-red-600/20",
    role === "EDITOR" && "bg-blue-50 text-blue-700 ring-blue-600/20",
    role === "VIEWER" && "bg-green-50 text-green-700 ring-green-600/20"
  );
  return <span className={styles}>{role}</span>;
}
