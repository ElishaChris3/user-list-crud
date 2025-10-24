'use client';
import { useState, useEffect } from "react";

const ROLES = ["ALL", "ADMIN", "EDITOR", "VIEWER"] as const;
type RoleFilter = (typeof ROLES)[number];

export function SearchBar({
  initialQuery = "",
  initialRole = "ALL",
  onChange,
}: {
  initialQuery?: string;
  initialRole?: RoleFilter;
  onChange: (q: string, role: RoleFilter) => void;
}) {
  const [q, setQ] = useState(initialQuery);
  const [role, setRole] = useState<RoleFilter>(initialRole);

  useEffect(() => {
    const t = setTimeout(() => onChange(q, role), 250);
    return () => clearTimeout(t);
  }, [q, role, onChange]);

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        className="input sm:w-80"
        placeholder="Search by name or email…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Role</label>
        <select
          className="input w-40"
          value={role}
          onChange={(e) => setRole(e.target.value as RoleFilter)}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
