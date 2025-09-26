"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ChoferesFlotaPage() {
    const { flotaId } = useParams();
    const router = useRouter();
    const [choferes, setChoferes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!flotaId) return;
        fetch(`/api/choferes/flota/${flotaId}`)
            .then((r) => r.json())
            .then((data) => setChoferes(Array.isArray(data) ? data : []))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [flotaId]);

    return (
        <div className="p-6 max-w-4xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4">Seleccionar Chofer (Flota)</h1>

            {loading ? (
                <p>Cargando choferes...</p>
            ) : choferes.length === 0 ? (
                <p>No hay choferes registrados para esta flota.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {choferes.map((c) => (
                        <li key={c._id} className="bg-gray-800 p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{c.nombre}</h3>
                                    <p className="text-sm text-gray-300">DNI: {c.dni}</p>
                                    <p className="text-sm text-gray-400">Tel: {c.telefono}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `choferes/${c._id}/vehiculos`
                                            )
                                        }
                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
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
