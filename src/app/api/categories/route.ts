import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(categories);
}

export async function POST(req: Request) {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const icon = typeof body?.icon === "string" ? body.icon.trim() : null;

    if (!name) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
        data: { name, icon: icon || null },
    });

    return NextResponse.json(category, { status: 201 });
}