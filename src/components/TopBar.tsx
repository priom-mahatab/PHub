"use client";

export default function TopBar({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
    return (
        <header className="h-12 border-b bg-white flex items-center px-3 gap-2">
            <button
                className="h-9 w-9 rounded-md hover:bg-gray-100 flex items-center justify-center"
                onClick={onOpenSidebar}
                aria-label="Open sidebar"
                title="Open sidebar"
        >
            <span className="text-lg leading-none">☰</span>
        </button>
        <div className="text-sm text-gray-500">PHub</div>

        </header>
    );
}
