import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { userSchema, roleEnum } from "../../../../lib/validator";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const roleParam = searchParams.get("role") || undefined;
    const role = roleParam && roleEnum.safeParse(roleParam).success ? (roleParam as any) : undefined;

    const users = await prisma.user.findMany({
      where: {
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(role ? { role } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const { name, email, role } = parsed.data;
    const user = await prisma.user.create({
      data: { name, email, role },
    });
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (err: any) {
    // Prisma unique constraint error
    if (err?.code === "P2002") {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
