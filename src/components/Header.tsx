'use client';
import Link from "next/link";

export function HeaderActions() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        Users
      </h1>
      <Link
        href="/users/new"
        className="rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
      >
        + Add User
      </Link>
    </div>
  );
}
