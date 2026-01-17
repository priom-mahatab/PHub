import { RecordTile } from "@/components/RecordTile";
import { NewRecordButton } from "@/components/NewRecordButton";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${categoryId}/records`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // keep it simple for now
    throw new Error("Failed to load records");
  }

  const records = await res.json();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Records</h1>
        <NewRecordButton categoryId={categoryId} />
      </div>

      {records.length === 0 ? (
        <div className="rounded-lg border p-6 text-sm text-zinc-500">
          No records yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {records.map((r: any) => (
            <RecordTile key={r.id} record={r} categoryId={categoryId} />
          ))}
        </div>
      )}
    </div>
  );
}
