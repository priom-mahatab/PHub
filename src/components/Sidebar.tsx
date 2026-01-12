"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  icon: string | null;
};

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    const data = (await res.json()) as Category[];
    setCategories(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCategory() {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.error ?? "Failed to create category");
      return;
    }

    setName("");
    setIcon("");
    await load();
  }

  // Collapsed sidebar: hidden (desktop). We'll add a "rail" later if you want.
  if (!open) return null;

  return (
    <aside className="w-72 border-r h-full flex flex-col">
      {/* Header with collapse button */}
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-lg bg-black text-white flex items-center justify-center font-semibold">
            P
          </div>
          <div className="font-semibold text-lg truncate">PHub</div>
        </div>

        <button
          className="h-9 w-9 rounded-md hover:bg-gray-100 flex items-center justify-center"
          onClick={onClose}
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          {/* collapse chevron */}
          <span className="text-lg leading-none">«</span>
        </button>
      </div>

      {/* Categories */}
      <div className="px-3 pb-2">
        <div className="text-xs font-medium text-gray-500 mb-2">CATEGORIES</div>

        <nav className="flex flex-col gap-1">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/c/${c.id}`}
              className="rounded-md px-2 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <span className="w-6 text-center">{c.icon ?? "📁"}</span>
              <span className="truncate">{c.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Add category */}
      <div className="mt-auto border-t p-3">
        <div className="text-xs font-medium text-gray-500 mb-2">
          ADD CATEGORY
        </div>

        <div className="flex gap-2">
          <input
            className="w-12 rounded-md border px-2 py-1"
            placeholder="🏠"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <input
            className="flex-1 rounded-md border px-2 py-1"
            placeholder="Apartments"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          onClick={createCategory}
          className="mt-2 w-full rounded-md bg-white text-black py-2 text-sm hover:opacity-90"
        >
          Add
        </button>
      </div>
    </aside>
  );
}
