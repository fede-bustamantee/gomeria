"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AsignarServicioAVehiculo() {
    const { vehiculoId } = useParams();
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        fetch("/api/servicios") // servicios base
            .then((res) => res.json())
            .then((data) => setServicios(Array.isArray(data) ? data : []))
            .catch((err) => console.error("Error al obtener servicios base:", err));
    }, []);

    const asignarServicio = async (servicioBaseId) => {
        const base = servicios.find((s) => s._id === servicioBaseId);
        const nuevo = {
            descripcion: base.descripcion,
            tipo: base.tipo,
            costo: base.costo,
            observaciones: base.observaciones || "",
            vehiculoId,
        };

        const res = await fetch("/api/asignar-servicio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo),
        });

        if (res.ok) {
            alert("Servicio asignado correctamente al vehículo.");
        } else {
            alert("Error al asignar servicio.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4">Asignar Servicio a este Vehículo</h1>
            <ul className="space-y-4">
                {servicios.map((s) => (
                    <li key={s._id} className="p-4 border rounded bg-gray-800">
                        <p><strong>Descripción:</strong> {s.descripcion}</p>
                        <p><strong>Tipo:</strong> {s.tipo}</p>
                        <button
                            onClick={() => asignarServicio(s._id)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Asignar a este vehículo
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}