'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UserForm, type UserFormValues } from "@/components/UserForm";

export default function EditUserPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initial, setInitial] = useState<UserFormValues | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load user");
        setInitial({
          name: json.data.name,
          email: json.data.email,
          role: json.data.role
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  async function handleSubmit(values: UserFormValues) {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error || "Failed to update user");
    }
    router.push("/users");
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <Link href="/users" className="btn">Back</Link>
      </div>
      {loading ? (
        <div className="rounded-md border p-10 text-center text-sm text-gray-600">Loading…</div>
      ) : error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : initial ? (
        <UserForm initialValues={initial} submitLabel="Save Changes" onSubmit={handleSubmit} />
      ) : (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          User not found.
        </div>
      )}
    </div>
  );
}
