'use client';
import Link from "next/link";

export function HeaderActions() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <Link href="/users/new" className="btn btn-primary">+ Add User</Link>
    </div>
  );
}
