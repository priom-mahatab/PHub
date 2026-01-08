import Link from "next/link"
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Priom's Personal Hub</h1>
        <p className="mt-3 text-zinc-300 max-w-xl">
          Click Menu to see categories.
        </p>
      </main>
    </div>
  );
}