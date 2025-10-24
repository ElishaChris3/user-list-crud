'use client';
import { useState } from "react";
import { z } from "zod";

const roleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: roleEnum
});

export type UserFormValues = z.infer<typeof userSchema>;

export function UserForm({
  initialValues = { name: "", email: "", role: "VIEWER" },
  submitLabel,
  onSubmit
}: {
  initialValues?: UserFormValues;
  submitLabel: string;
  onSubmit: (values: UserFormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<UserFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = userSchema.safeParse(values);
    if (!parsed.success) {
      const issues = parsed.error.issues.reduce((acc, i) => {
        acc[i.path.join(".")] = i.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(issues);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit(parsed.data);
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {serverError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input
          id="name"
          className="input"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label className="label" htmlFor="role">Role</label>
        <select
          id="role"
          className="input"
          value={values.role}
          onChange={(e) =>
            setValues((v) => ({ ...v, role: e.target.value as UserFormValues["role"] }))
          }
        >
          <option value="ADMIN">ADMIN</option>
          <option value="EDITOR">EDITOR</option>
          <option value="VIEWER">VIEWER</option>
        </select>
      </div>
      <div className="pt-2">
        <button className="btn btn-primary" disabled={submitting} type="submit">
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
