'use client';
import Link from "next/link";
import { RoleBadge } from "./RoleBadge";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  createdAt?: string;
  updatedAt?: string;
};

export function UserTable({
  users,
  onDelete,
  deletingId,
}: {
  users: UserRow[];
  onDelete: (id: string) => void;
  deletingId?: string | null;
}) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center text-sm text-gray-600 shadow-inner">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/70 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/80">
      {/* ✅ Limit visible height & enable vertical scroll */}
      <div className="max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-indigo-100 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Role</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u, i) => (
              <tr
                key={u.id}
              className={`transition-colors duration-200 ${
  i % 2 === 0
    ? "bg-gradient-to-r from-white to-gray-50"
    : "bg-gradient-to-r from-gray-50 to-white"
} hover:bg-indigo-100/30`}


              >
                <td className="px-6 py-4 text-gray-800 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  <RoleBadge role={u.role} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/users/${u.id}/edit`}
                      className="rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1.5 text-xs font-medium text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
                          onDelete(u.id);
                        }
                      }}
                      disabled={deletingId === u.id}
                      className={`rounded-md bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1.5 text-xs font-medium text-white shadow-md transition-all hover:shadow-lg hover:scale-105 ${
                        deletingId === u.id ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {deletingId === u.id ? "Deleting…" : "🗑 Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
