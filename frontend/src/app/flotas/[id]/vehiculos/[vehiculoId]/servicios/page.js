"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleVehiculoFlota() {
    const { vehiculoId } = useParams();
    const [vehiculo, setVehiculo] = useState(null);
    const [cubiertas, setCubiertas] = useState([]); // SIEMPRE array
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const vehiculoRes = await fetch(`/api/vehiculos/${vehiculoId}`);
                const vehiculoData = await vehiculoRes.json();
                setVehiculo(vehiculoData);

                const cubiertasRes = await fetch(`/api/cubiertas/vehiculo/${vehiculoId}`);
                let cubiertasData = await cubiertasRes.json();
                // Si no es array, lo transformo en array vacío
                if (!Array.isArray(cubiertasData)) {
                    cubiertasData = [];
                }
                setCubiertas(cubiertasData);

                const serviciosRes = await fetch(`/api/asignar-servicio`);
                const allServicios = await serviciosRes.json();
                const relacionados = allServicios.filter(
                    (s) => s.vehiculoId?._id === vehiculoId
                );
                setServicios(relacionados);

                setLoading(false);
            } catch (err) {
                console.error("Error al obtener los datos:", err);
                setLoading(false);
            }
        }

        fetchData();
    }, [vehiculoId]);

    if (loading) return <p className="p-4">Cargando...</p>;
    if (!vehiculo) return <p className="p-4">Vehículo no encontrado.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-800 rounded text-white">
            <h2 className="text-2xl font-bold mb-4">Detalle del Vehículo</h2>
            <div className="space-y-2 mb-6">
                <p><strong>Patente:</strong> {vehiculo.patente}</p>
                <p><strong>Marca:</strong> {vehiculo.marca}</p>
                <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
                <p><strong>Año:</strong> {vehiculo.anio}</p>
                <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Cubiertas</h3>
            {cubiertas.length === 0 ? (
                <p>No hay cubiertas registradas para este vehículo.</p>
            ) : (
                <ul className="space-y-2">
                    {cubiertas.map((cubierta) => (
                        <li
                            key={cubierta._id}
                            className="border p-3 rounded bg-gray-700"
                        >
                            <p><strong>Marca:</strong> {cubierta.marca}</p>
                            <p><strong>Medida:</strong> {cubierta.medida}</p>
                            <p><strong>Dibujo:</strong> {cubierta.dibujo}</p>
                            <p><strong>Estado:</strong> {cubierta.estado}</p>
                            <p><strong>Posición:</strong> {cubierta.posicion}</p>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="text-xl font-semibold mt-6 mb-2">Servicios Realizados</h3>
            {servicios.length === 0 ? (
                <p>No hay servicios registrados.</p>
            ) : (
                <ul className="space-y-3">
                    {servicios.map((s) => (
                        <li
                            key={s._id}
                            className="border p-3 rounded bg-gray-700"
                        >
                            <p><strong>Descripción:</strong> {s.descripcion}</p>
                            <p><strong>Tipo:</strong> {s.tipo}</p>
                            <p><strong>Aplicado a:</strong> {s.cubiertaId ? `Cubierta (${s.cubiertaId.posicion})` : "Vehículo general"}</p>
                            <p><strong>Fecha:</strong> {new Date(s.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}