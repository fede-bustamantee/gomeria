"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChoferesPorFlota() {
    const { id: flotaId } = useParams();
    const [choferes, setChoferes] = useState([]);

    useEffect(() => {
        fetch(`/api/choferes/flota/${flotaId}`)
            .then(res => res.json())
            .then(setChoferes);
    }, [flotaId]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Choferes de la Flota</h2>

            <Link href={`/flotas/${flotaId}/choferes/nuevo`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
                    + Agregar Chofer
                </button>
            </Link>

            {choferes.length === 0 ? (
                <p>No hay choferes asociados a esta flota.</p>
            ) : (
                <ul className="space-y-2">
                    {choferes.map((c) => (
                        <li key={c._id} className="bg-gray-800 p-3 rounded shadow">
                            <p><strong>Nombre:</strong> {c.nombre}</p>
                            <p><strong>DNI:</strong> {c.dni}</p>
                            <p><strong>Teléfono:</strong> {c.telefono}</p>
                            <p><strong>Licencia:</strong> {c.licencia}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
