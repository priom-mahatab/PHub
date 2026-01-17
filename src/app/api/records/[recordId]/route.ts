import { NextRouter } from "next/router";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ recordId: string }> } 
) {
    try {
        const { recordId } = await params;
        const body = await req.json().catch(() => ({}));

        const title = 
            typeof body.title === "string" && body.title.trim().length > 0
            ? body.title.trim()
            : null;
        
        if (!title) {
            return NextResponse.json(
                { error: "Title is required"},
                { status: 400 }
            )
        }

        const record = await prisma.record.update({
            where: { id: recordId },
            data: { title },
            select: {
                id: true,
                title: true,
                coverEmoji: true,
                coverColor: true,
                createdAt: true,
                updatedAt: true,
                categoryId: true
            },
        });

        return NextResponse.json(record);
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to update record" },
            { status: 500 }
        );
    }
}