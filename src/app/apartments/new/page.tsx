"use client";

import { useState } from "react";

export default function NewApartmentPage() {
  const [form, setForm] = useState({
    propertyName: "",
    location: "",
    rent: "",
    googleMapsUrl: "",
    email: "",
    phone: "",
    website: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function saveApartment() {
  await fetch("/api/apartments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  window.location.href = "/apartments";
}
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <h1 className="text-3xl font-bold">Add Apartment</h1>
      <form className="mt-6 space-y-4 max-w-xl">
        <Input label="Property name" value={form.propertyName} onChange={(e) => update("propertyName", e.target.value)} />
        <Input label="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
        <Input label="Rent" type="number" value={form.rent} onChange={(e) => update("rent", e.target.value)} />
        <Input label="Google Maps URL" type="url" value={form.googleMapsUrl} onChange={(e) => update("googleMapsUrl", e.target.value)} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        <Input label="Phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        <Input label="Property Website" type="url" value={form.website} onChange={(e) => update("website", e.target.value)} />

        <div>
          <label className="block text-sm text-zinc-300 mb-1">Image</label>
          <input
            type="file"
            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2"
          />
        </div>

        <button
          type="button"
          onClick={saveApartment}
          className="rounded-lg px-4 py-2 border border-zinc-800 hover:bg-zinc-900"
        >
          Save
        </button>
      </form>
    </div>
  );
}

function Input({ label, type = "text", value, onChange }: { label: string; type?: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div>
      <label className="block text-sm text-zinc-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
        onChange={onChange}
      />
    </div>
  );
}
