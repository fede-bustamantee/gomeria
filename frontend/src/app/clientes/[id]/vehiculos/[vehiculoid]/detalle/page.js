"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetalleVehiculo() {
  const { vehiculoid } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [cubiertas, setCubiertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const vehiculoRes = await fetch(`/api/vehiculos/${vehiculoid}`);
        const vehiculoData = await vehiculoRes.json();
        setVehiculo(vehiculoData);

        const cubiertasRes = await fetch(`/api/cubiertas/vehiculo/${vehiculoid}`);
        const cubiertasData = await cubiertasRes.json();
        setCubiertas(cubiertasData);

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [vehiculoid]);

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
        <p><strong>Cliente:</strong> {vehiculo.clienteId?.nombre || "Sin asignar"}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Cubiertas</h3>
      {cubiertas.length === 0 ? (
        <p>No hay cubiertas registradas para este vehículo.</p>
      ) : (
        <ul className="space-y-2">
          {cubiertas.map((cubierta) => (
            <li key={cubierta._id} className="border p-3 rounded bg-gray-700">
              <p><strong>Marca:</strong> {cubierta.marca}</p>
              <p><strong>Medida:</strong> {cubierta.medida}</p>
              <p><strong>Dibujo:</strong> {cubierta.dibujo}</p>
              <p><strong>Estado:</strong> {cubierta.estado}</p>
              <p><strong>Posición:</strong> {cubierta.posicion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}