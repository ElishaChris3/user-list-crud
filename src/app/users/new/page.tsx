'use client';
import { UserForm, type UserFormValues } from "@/components/UserForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();

  async function handleSubmit(values: UserFormValues) {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error || "Failed to create user");
    }
    router.push("/users");
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add User</h1>
        <Link href="/users" className="btn">Back</Link>
      </div>
      <UserForm submitLabel="Create User" onSubmit={handleSubmit} />
    </div>
  );
}
