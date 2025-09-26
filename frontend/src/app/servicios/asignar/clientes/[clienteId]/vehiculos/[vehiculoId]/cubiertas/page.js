"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SeleccionarCubierta() {
  const { clienteId, vehiculoId } = useParams();
  const router = useRouter();
  const [vehiculo, setVehiculo] = useState(null);
  const [cubiertas, setCubiertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const vehiculoRes = await fetch(`/api/vehiculos/${vehiculoId}`);
        const vehiculoData = await vehiculoRes.json();
        setVehiculo(vehiculoData);

        const cubiertasRes = await fetch(`/api/cubiertas/vehiculo/${vehiculoId}`);
        const cubiertasData = await cubiertasRes.json();
        setCubiertas(Array.isArray(cubiertasData) ? cubiertasData : []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [vehiculoId]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!vehiculo) return <p className="p-4">Vehículo no encontrado.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Asignar Servicio</h2>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <p><strong>Vehículo:</strong> {vehiculo.marca} {vehiculo.modelo} ({vehiculo.patente})</p>
        <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
        <p><strong>Cliente:</strong> {vehiculo.clienteId?.nombre || "Sin asignar"}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Asignar al vehículo completo</h3>
          <button
            onClick={() =>
              router.push(`servicios`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Asignar servicio al vehículo
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">O seleccionar una cubierta</h3>
          {cubiertas.length === 0 ? (
            <p>No hay cubiertas registradas para este vehículo.</p>
          ) : (
            <ul className="space-y-4">
              {cubiertas.map((cubierta) => (
                <li key={cubierta._id} className="p-4 border rounded bg-gray-800">
                  <p><strong>Marca:</strong> {cubierta.marca}</p>
                  <p><strong>Medida:</strong> {cubierta.medida}</p>
                  <p><strong>Posición:</strong> {cubierta.posicion}</p>
                  <button
                    onClick={() =>
                      router.push(`cubiertas/${cubierta._id}/servicios`)
                    }
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Asignar servicio a esta cubierta
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
