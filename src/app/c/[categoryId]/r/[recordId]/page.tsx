import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { RecordTitleEditor } from "@/components/RecordTitleEditor";

export default async function RecordPage({
    params,
}: {
    params: Promise<{ categoryId: string, recordId: string }>
}) {
    const { categoryId, recordId } = await params;
    
    const record = await prisma.record.findFirst({
        where: { id: recordId, categoryId },
        select: {
            id: true,
            title: true,
            coverEmoji: true,
            coverColor: true,
            updatedAt: true
        },
    });

    if (!record) return notFound();

    return (
        <div className="p-6">
            <div className="mb-4">
                <RecordTitleEditor recordId={recordId} initialTitle={record.title} />
                <div className="text-sm text-zinc-500">Record ID: {record.id}</div>
            </div>

            <div className="rounded-lg border p-4 text-sm text-zinc-500">
                Editor goes here (title editing + dynamic fields next)
            </div>
        </div>
    );
}