import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800">
        <details className="relative">
          <summary className="list-none cursor-pointer rounded-md px-3 py-2 hover:bg-zinc-900 border border-zinc-800">
            ☰
          </summary>
          <div className="absolute left-0 mt-3 w-72 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
            <div className="text-sm font-semibold text-zinc-200 mb-3">
              Categories
            </div>
            <Link href="/apartments" className="block rounded-lg px-3 py-2 hover:bg-zinc-900">
              Apartments
            </Link>
          </div>
        </details>

        <div className="text-2xl font-bold tracking-tight">Phub</div>
      </header>

      <main className="px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Priom's Personal Hub</h1>
        <p className="mt-3 text-zinc-300 max-w-xl">
          Click Menu to see categories.
        </p>
      </main>
    </div>
  );
}