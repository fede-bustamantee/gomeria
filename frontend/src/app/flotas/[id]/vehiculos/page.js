"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function VehiculosPorFlotaPage() {
    const { id } = useParams(); // id = flotaId
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        fetch(`/api/vehiculos/flota/${id}`)
            .then((res) => res.json())
            .then((data) => setVehiculos(data))
            .catch((err) => console.error("Error:", err));
    }, [id]);

    return (
        <div className="p-4 text-white">
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
                    {vehiculos.map((v) => (
                        <li
                            key={v._id}
                            className="bg-gray-800 p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <strong>{v.patente}</strong> - {v.marca} {v.modelo} ({v.tipo})
                            </div>
                            <div className="flex gap-2">
                                {/* Botón para ver servicios del vehículo */}
                                <Link
                                    href={`vehiculos/${v._id}/servicios`}
                                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                                >
                                    Ver Servicios
                                </Link>

                                {/* Opcional: botón para editar vehículo */}
                                <Link
                                    href={`/flotas/${id}/vehiculos/${v._id}/editar`}
                                    className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                                >
                                    Editar
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
