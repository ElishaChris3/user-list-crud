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
      <div className="rounded-md border border-dashed p-10 text-center text-sm text-gray-600">
        No users found.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="table">
        <thead className="bg-gray-50">
          <tr>
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Role</th>
            <th className="th text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="td">{u.name}</td>
              <td className="td">{u.email}</td>
              <td className="td"><RoleBadge role={u.role} /></td>
              <td className="td">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/users/${u.id}/edit`} className="btn">Edit</Link>
                  <button
                    className="btn text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      if (confirm("Delete this user? This cannot be undone.")) {
                        onDelete(u.id);
                      }
                    }}
                    disabled={deletingId === u.id}
                  >
                    {deletingId === u.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
