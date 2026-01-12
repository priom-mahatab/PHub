"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const STORAGE_KEY = "phub.sidebarOpen";

export default function Shell({ children } : { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === "false") setSidebarOpen(false);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(sidebarOpen));
    }, [sidebarOpen]);

    return (
        <div className="h-full flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    )
}