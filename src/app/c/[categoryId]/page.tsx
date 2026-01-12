import { prisma } from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId },
  });

  if (!category) return <div>Category not found.</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>{category.icon ?? "📁"}</span>
        <span>{category.name}</span>
      </h1>

      <div className="mt-6 rounded-lg border bg-white p-4">
        <div className="font-medium">Records (coming next milestone)</div>
        <div className="text-sm text-gray-600 mt-1">
          This page will show record tiles inside this category.
        </div>
      </div>
    </div>
  );
}
