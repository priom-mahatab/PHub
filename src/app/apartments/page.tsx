import Link from "next/link";
import apartments from "@/data/apartments.json";

export default function ApartmentsPage() {
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(apartments as any[]).map((a) => (
          <Link key={a.id} href={`/apartments/${a.id}`} className="group">
            <div  className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-400 text-sm">
                No Image
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-lg font-semibold group-hover:text-white transition">
                  {a.propertyName}
                </div>

                {a.location && (
                  <div className="text-sm text-zinc-400 mt-1">{a.location}</div>
                )}

                {a.rent && (
                  <div className="mt-3 text-sm font-medium text-zinc-200">
                    ${a.rent}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}

        {(apartments as any[]).length === 0 && (
          <div className="text-zinc-400 mt-6">No apartments added yet</div>
        )}
      </div>
    </div>
  );
}
