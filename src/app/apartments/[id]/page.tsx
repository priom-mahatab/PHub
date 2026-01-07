import apartments from "@/data/apartments.json";



export default async function ApartmentDefaultPage(
    { params, }: { params: Promise<{ id: string }>; }
) {
    const { id } = await params;
    console.log("SERVER PARAMS:", { id });

    // console.log("PARAM ID:", params.id);
    // console.log("ALL IDS:", (apartments as any[]).map(a => a.id));

    const apt = (apartments as any[]).find((a) => a.id === id);

    if (!apt) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
                <div className="text-xl font-semibold">Apartment not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <h1 className="text-3xl font-bold">{apt.propertyName}</h1>
            <p className="mt-1 text-zinc-400">{apt.location}</p>
            <p className="mt-2 text-lg">{apt.rent ? `$${apt.rent}` : ""}</p>

            <div className="mt-8 space-y-3 max-w-2xl">
                <Row label="Google Maps" value={apt.googleMapsUrl} isLink />
                <Row label="Email" value={apt.email} />
                <Row label="Phone" value={apt.phone} />
                <Row label="Website" value={apt.website} isLink />
            </div>
        </div>
    )


}

function Row({label, value, isLink}: {label: string; value?: string; isLink?: boolean;}) {
    if (!value) {
        return null;
    }

    return (
        <div className="rounded-xl border border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">{label}</div>
            <div className="mt-1">
                {isLink ? (
                    <a href={value}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                    >
                        {value}
                    </a>
                ) : (
                    <span className="text-zinc-100">{value}</span>
                )
            }
            </div>
        </div>
    );
}
