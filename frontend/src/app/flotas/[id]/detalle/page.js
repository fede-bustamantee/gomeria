"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DetalleFlota() {
    const { id } = useParams();
    const [flota, setFlota] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/flotas/${id}`)
            .then(res => res.json())
            .then(data => {
                setFlota(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener la flota:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!flota) return <p>Flota no encontrada.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-800 text-white rounded">
            <h2 className="text-2xl font-bold mb-4">Detalle de la Flota</h2>
            <p><strong>Nombre:</strong> {flota.nombre}</p>
            <p><strong>Contacto:</strong> {flota.contacto}</p>
            <p><strong>Dirección:</strong> {flota.direccion}</p>

            <div className="mt-6 space-x-4">
                <Link href={`/flotas/${id}/vehiculos`}>
                    <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Ver Vehículos</button>
                </Link>
                <Link href={`/flotas/${id}/choferes`}>
                    <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Ver Choferes</button>
                </Link>
            </div>
        </div>
    );
}
