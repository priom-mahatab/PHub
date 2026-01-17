"use client";

import { useEffect, useState } from "react";

export function RecordTitleEditor({
    recordId,
    initialTitle,
}: {
    recordId: string;
    initialTitle: string;
}) {
    const [title, setTitle] = useState(initialTitle);
    const [saving, setSaving] = useState(false);

    // simple debounce autosave
    useEffect(() => {
        const t = setTimeout(async () => {
            if (title === initialTitle) return;

            try {
                setSaving(true);
                const res = await fetch(`/api/records/${recordId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title }),
                });

                if (!res.ok) return;
            } finally {
                setSaving(false);
            }
        }, 500)

        return () => clearTimeout(t);
    }, [title, recordId, initialTitle]);

    return (
        <div className="flex items-center gap-3">
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-lg font-semibold"
                placeholder="Untitled"
            />
            <span className="text-sm text-zinc-500">
                {saving ? "Saving..." : ""}
            </span>
        </div>
    );
}