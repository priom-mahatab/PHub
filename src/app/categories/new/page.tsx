"use client"

import { useState } from "react";

export default function NewCategoryPage() {
    const [name, setName] = useState("");

    async function save() {
        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        const text = await res.text();

        if (!res.ok) {
            alert(`Failed (${res.status}): ${text}`);
            return;
        }

        window.location.href ="/";
    }

    return (
        <div className="px-6 py-12">
            <h1 className="text-3xl font-bold">Add Category</h1>

            <div className="mt-6 max-w-lg space-y-4">
                <label>Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2"
                />
            </div>
            <button
                type="button"
                className="rounded-lg px-4 py-2 border border-zinc-800 hover:bg-zinc-900"
                onClick={save}
            >
                Save
            </button>
        </div>
    );
}
