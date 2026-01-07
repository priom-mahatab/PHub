export default function NewApartmentPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <h1 className="text-3xl font-bold">Add Apartment</h1>
            <form className="mt-6 space-y-4 max-w-xl">
                <Input label="Property name" />
                <Input label="Location" />
                <Input label="Rent" type="number" />
                <Input label="Google Maps URL" type="url" />
                <Input label="Email" type="email" />
                <Input label="Phone" type="tel" />
                <Input label="Property Website" type="url" />

                <div>
                    <label className="block text-sm text-zinc-300 mb-1">Image</label>
                    <input
                        type="file"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2"
                    />
                </div>

                <button type="button" className="rounded-lg px-4 py-2 border border-zinc-800 hover:bg-zinc-900">
                    Save
                </button>
            </form>
        </div>
    );

}

function Input({ label, type="text"}: {label: string; type?: string }) {
    return (
        <div>
            <label className="block text-sm text-zinc-300 mb-1">{label}</label>
            <input
                type={type}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            />
        </div>
    )
}