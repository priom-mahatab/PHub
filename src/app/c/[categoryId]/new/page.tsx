export default async function NewRecordPage({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) {
    const {categoryId} = await params;

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-xl font-semibold mb-4">New Record</h1>
            <div className="rounded-lg border p-4 text-sm text-zinc-500">
                Record creation from goes here (category: {categoryId})
            </div>
        </div>   
    );
}