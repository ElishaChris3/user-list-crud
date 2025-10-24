'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HeaderActions } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { UserTable, type UserRow } from "@/components/UserTable";

type RoleFilter = "ALL" | "ADMIN" | "EDITOR" | "VIEWER";

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [role, setRole] = useState<RoleFilter>("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (role !== "ALL") params.set("role", role);
      const res = await fetch(`/api/users?${params.toString()}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load users");
      setUsers(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [q, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSearchChange = useCallback((qv: string, rv: RoleFilter) => {
    setQ(qv);
    setRole(rv);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      setDeletingId(id);
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j?.error || "Failed to delete");
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }, []);

  return (
    <div>
      <HeaderActions />
      <SearchBar onChange={onSearchChange} />
      {loading ? (
        <div className="rounded-md border p-10 text-center text-sm text-gray-600">Loading…</div>
      ) : error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <UserTable users={users} onDelete={handleDelete} deletingId={deletingId} />
      )}
      <div className="mt-6 text-sm text-gray-500">
        Tip: Try filtering by role or searching by email.
      </div>
    </div>
  );
}
