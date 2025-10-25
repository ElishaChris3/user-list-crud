import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { userSchema } from "../../../../../lib/validator";
import { isValidObjectIdString } from "../../../../../lib/validator";
 

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

// ✅ Correctly typed params according to Next.js 14 route handler signatures
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- Fix here
) {
  const { id } = await context.params;

  if (!isValidObjectIdString(id)) {
    return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- Fix here
) {
  const { id } = await context.params;

  if (!isValidObjectIdString(id)) {
    return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 });
    }
    if (err?.code === "P2025") {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- Fix here
) {
  const { id } = await context.params;

  if (!isValidObjectIdString(id)) {
    return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}

