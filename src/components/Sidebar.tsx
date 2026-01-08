"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-2 hover:bg-zinc-900 border border-zinc-800"
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50"
          aria-label="Close sidebar overlay"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 p-4 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-200">Categories</div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1 hover:bg-zinc-900 border border-zinc-800"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-zinc-900"
          >
            Home Page
          </Link>
          <Link
            href="/apartments"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-zinc-900"
          >
            Apartments
          </Link>

          {/* Placeholder for later */}
          <button
            type="button"
            className="w-full text-left rounded-lg px-3 py-2 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-900"
            onClick={() => alert("Next step: Add Category page")}
          >
            + Add category
          </button>
        </div>
      </div>
    </>
  );
}
