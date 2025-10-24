import { z } from "zod";

export const roleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);
export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: roleEnum
});

export type Role = z.infer<typeof roleEnum>;
export type UserInput = z.infer<typeof userSchema>;

export function isValidObjectIdString(id: string) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
