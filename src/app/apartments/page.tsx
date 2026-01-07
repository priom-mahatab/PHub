import Link from "next/link";
import apartments from "@/data/apartments.json";

export default function ApartmentsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Apartments</h1>
                <Link href="/apartments/new" className="rounded-lg px-4 py-2 border border-zinc-800 hover:bg-zinc-900">
                    +Add
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(apartments as any[]).map((a) => (
                    <Link
                        key={a.id}
                        href={`/apartments/${a.id}`}
                    >
                        <div className="text-lg font-semibold">{a.propertyName}</div>
                        <div className="text-sm text-zinc-400">{a.location || ""}</div>
                        <div className="mt-2 text-sm">{a.rent ? `$${a.rent}` : ""}</div>
                    </Link>
                ))}

                {(apartments as any[]).length === 0 && (
                    <div className="text-zinc-400 mt-6">
                        No apartments added yet
                    </div>
                )}
            </div>
        </div>
    )
}