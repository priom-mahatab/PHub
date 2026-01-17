import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    const records = await prisma.record.findMany({
      where: { categoryId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        coverEmoji: true,
        coverColor: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(records);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const body = await req.json().catch(() => ({}));

    const {categoryId} = await params;

    const title =
      typeof body.title === "string" && body.title.trim().length > 0
        ? body.title.trim()
        : "Untitled";

    const record = await prisma.record.create({
      data: {
        categoryId,
        title,
        coverEmoji:
          typeof body.coverEmoji === "string" ? body.coverEmoji : null,
        coverColor:
          typeof body.coverColor === "string" ? body.coverColor: null,
      },

      select: {
        id: true,
        title: true,
        coverEmoji: true,
        coverColor: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create record " },
      { status: 500 }
    );
  }
}
