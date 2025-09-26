"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FlotasPage() {
    const [flotas, setFlotas] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/flotas")
            .then((r) => r.json())
            .then((data) => setFlotas(Array.isArray(data) ? data : []))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, []);

    const filtered = flotas.filter((f) =>
        f.nombre?.toLowerCase().includes(q.toLowerCase())
    );

    return (
        <div className="p-6 max-w-4xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4">Seleccionar Flota</h1>

            <div className="mb-4 flex gap-2">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar flota..."
                    className="flex-1 p-2 rounded border bg-white/5"
                />
            </div>

            {loading ? (
                <p>Cargando flotas...</p>
            ) : filtered.length === 0 ? (
                <p>No se encontraron flotas.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {filtered.map((f) => (
                        <li key={f._id} className="bg-gray-800 p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{f.nombre}</h3>
                                    <p className="text-sm text-gray-300">{f.contacto}</p>
                                    {f.direccion && <p className="text-sm text-gray-400">{f.direccion}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => router.push(`flotas/${f._id}/choferes`)}
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                                    >
                                        Seleccionar
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}