import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/apartments.json");

function readApartments() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeApartments(apartments: any[]) {
    fs.writeFileSync(filePath, JSON.stringify(apartments, null, 2));
}

export async function GET() {
    const apartments = readApartments();
    return NextResponse.json(apartments);
}

export async function POST(req: Request) {
    const data = await req.json();

    const apartments = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newApartment = {
        id: `apt_${Date.now()}`,
        propertyName: data.propertyName ?? "",
        location: data.location ?? "",
        rent: data.rent ? Number(data.rent) : null,
        googleMapsUrl: data.googleMapsUrl ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        website: data.website ?? "",
        imageUrl: "",
    };

    apartments.push(newApartment);
    fs.writeFileSync(filePath, JSON.stringify(apartments, null, 2));

    return NextResponse.json({ ok: true, id: newApartment.id });
}

export async function DELETE(req: Request) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) { return NextResponse.json({ error: "id is required"})};

    const apartments = readApartments();
    const filtered = apartments.filter((a: any) => a.id !== id);

    writeApartments(filtered);

    return NextResponse.json({ ok: true });

}