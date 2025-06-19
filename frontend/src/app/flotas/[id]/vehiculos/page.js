"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function VehiculosPorFlotaPage() {
    const { id } = useParams();
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        fetch(`/api/vehiculos/flota/${id}`)
            .then(res => res.json())
            .then(data => setVehiculos(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Vehículos de la Flota</h2>

            <Link href={`/flotas/${id}/vehiculos/nuevo`}>
                <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Agregar Vehículo
                </button>
            </Link>

            {vehiculos.length === 0 ? (
                <p>No hay vehículos registrados para esta flota.</p>
            ) : (
                <ul className="space-y-2">
                    {vehiculos.map(v => (
                        <li key={v._id} className="bg-gray-800 text-white p-3 rounded">
                            <strong>{v.patente}</strong> - {v.marca} {v.modelo} ({v.tipo})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}