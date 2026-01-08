import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/apartments.json");

export async function POST(req: Request) {

    console.log("✅ POST /api/apartments HIT");
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