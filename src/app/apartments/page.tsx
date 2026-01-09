"use client";

import Link from "next/link";
import apartments from "@/data/apartments.json";
import { useEffect, useState } from "react";

type Apartment = {
  id: string;
  propertyName: string;
  location?: string;
  rent?: number;
};

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetch("/api/apartments")
      .then((r) => r.json())
      .then(setApartments)
      .catch(() => setApartments([]));
  }, []);

  async function deleteApartment(id: string) {
    const ok = confirm("Delete this apartment?");
    if (!ok) return;

    await fetch(`/api/apartments?id=${id}`, {
      method: "DELETE",
    });

    setApartments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Apartments</h1>
        <Link
          href="/apartments/new"
          className="rounded-lg px-4 py-2 border border-zinc-800 hover:bg-zinc-900"
        >
          +Add
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map((a) => (
          <div
            key={a.id}
            className="relative rounded-xl border border-zinc-800 p-4 hover:bg-zinc-900"
          >
            {/* Image placeholder */}
            <div className="h-40 bg-linear-to-br from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-400 text-sm">
              No Image
            </div>
            
            <button
              onClick={() => deleteApartment(a.id)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-red-400"
              aria-label={`Delete ${a.propertyName}`}
            >
              ✕
            </button>

            <Link href={`/apartments/${a.id}`}>
              <div className="mt-4 text-lg font-semibold">{a.propertyName}</div>
              <div className="text-sm text-zinc-400">{a.location || ""}</div>
              <div className="mt-2 text-sm">{a.rent ? `$${a.rent}` : ""}</div>
            </Link>
            {(apartments as any[]).length === 0 && (
              <div className="text-zinc-400 mt-6">No apartments added yet</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
