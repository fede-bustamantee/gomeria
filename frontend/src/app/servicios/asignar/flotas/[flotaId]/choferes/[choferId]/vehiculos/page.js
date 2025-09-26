"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VehiculosFlotaChoferPage() {
    const { flotaId, choferId } = useParams();
    const router = useRouter();
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!flotaId) return;
        // Se asume que tienes una API: /api/vehiculos/flota/[flotaId]
        fetch(`/api/vehiculos/flota/${flotaId}`)
            .then((r) => r.json())
            .then((data) => setVehiculos(Array.isArray(data) ? data : []))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [flotaId]);

    return (
        <div className="p-6 max-w-5xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4">Seleccionar Vehículo</h1>

            {loading ? (
                <p>Cargando vehículos...</p>
            ) : vehiculos.length === 0 ? (
                <p>No se encontraron vehículos en esta flota.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {vehiculos.map((v) => (
                        <li key={v._id} className="bg-gray-800 p-4 rounded-lg shadow">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <h3 className="font-semibold">{v.patente}</h3>
                                    <p className="text-sm text-gray-300">{v.marca} {v.modelo}</p>
                                    <p className="text-sm text-gray-400">Año: {v.anio} · Tipo: {v.tipo}</p>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `vehiculos/${v._id}/cubiertas`
                                            )
                                        }
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
