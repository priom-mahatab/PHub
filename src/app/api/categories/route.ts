export const runtime = "nodejs"

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/categories.json");

function readCategories() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeCategories(categories: any[]) {
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
}

export async function GET() {
    const categories = readCategories();
    return NextResponse.json(categories);
}

export async function POST(req: Request) {
    const data = await req.json();
    const name = (data.name ?? "").trim();

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // temporary
    const newCategory = {
        id: `cat_${Date.now()}`,
        name,
        path: `/c/${Date.now()}`
    };

    const categories = readCategories();
    categories.push(newCategory);
    writeCategories(categories);

    return NextResponse.json(newCategory, {status: 201});
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) { return NextResponse.json({ error: "id is required" }, { status: 400 }); }

    const categories = readCategories();
    const filtered = categories.filter((c: any) => c.id !== id);

    writeCategories(filtered);

    return NextResponse.json({ ok: true });
}