"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewRecordButton({ categoryId }: { categoryId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function create() {
        try {
            setLoading(true);
            const res = await fetch(`/api/categories/${categoryId}/records`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({}), // will create untitled
            });

            if (!res.ok) throw new Error("Failed to create new record");

            router.refresh();
        } finally {
            setLoading(false);
        }
    }
    return (
        <button 
            onClick={create}
            disabled={loading}
            className="rounded-md border px-3 py-1 text-sm hover:bg-zinc-50 disabled:opacity-50"
        >
            {loading ? "Creating..." : "+ New"}
        </button>
    )
}

