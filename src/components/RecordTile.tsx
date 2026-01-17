"use client"

import Link from "next/link";

export function RecordTile({
    categoryId,
    record,
}: {
    categoryId: string;
    record: {id: string, title: string, coverEmoji?: string | null};
}) {
    return (
        <Link
            href={`/c/${categoryId}/r/${record.id}`}
            className="group block rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
        <div className="mb-3 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-gray-50 text-lg">
          {record.coverEmoji ?? "📄"}
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium">{record.title}</div>
          <div className="text-xs text-gray-500">Record</div>
        </div>
      </div>
      <div className="h-20 rounded-xl bg-gray-50 transition group-hover:bg-gray-100"/>

    </Link>
    )
}