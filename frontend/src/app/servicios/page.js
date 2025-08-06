"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServiciosPage() {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        fetch("/api/servicios")
            .then((res) => res.json())
            .then(setServicios)
            .catch((err) => console.error("Error al obtener servicios:", err));
    }, []);

    const eliminarServicio = async (id) => {
        const confirmar = confirm("¿Estás seguro de que querés eliminar este servicio?");
        if (!confirmar) return;

        try {
            const res = await fetch(`/api/servicios/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el servicio");
            }

            // Actualizar lista
            setServicios(servicios.filter((s) => s._id !== id));
        } catch (error) {
            console.error("Error eliminando servicio:", error);
            alert("Ocurrió un error al eliminar el servicio.");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Servicios</h1>

            <Link href="/servicios/nuevo">
                <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Crear nuevo servicio
                </button>
            </Link>

            {servicios.length === 0 ? (
                <p className="text-gray-600">No hay servicios registrados aún.</p>
            ) : (
                <ul className="space-y-4">
                    {servicios.map((s) => (
                        <li key={s._id} className="p-4 border rounded shadow">
                            <p><strong>Descripción Servicio:</strong> {s.descripcion}</p>
                            <p><strong>Tipo Vehiculo:</strong> {s.tipo}</p>
                            <p><strong>Costo:</strong> ${s.costo}</p>
                            {s.observaciones && <p><strong>Obs.:</strong> {s.observaciones}</p>}
                            <button
                                onClick={() => eliminarServicio(s._id)}
                                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
