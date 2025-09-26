"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CubiertasVehiculoPage() {
  const { flotaId, choferId, vehiculoId } = useParams();
  const router = useRouter();
  const [vehiculo, setVehiculo] = useState(null);
  const [cubiertas, setCubiertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const vRes = await fetch(`/api/vehiculos/${vehiculoId}`);
        const vData = await vRes.json();
        setVehiculo(vData);

        const cRes = await fetch(`/api/cubiertas/vehiculo/${vehiculoId}`);
        const cData = await cRes.json();
        setCubiertas(Array.isArray(cData) ? cData : []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    }
    if (vehiculoId) fetchAll();
  }, [vehiculoId]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!vehiculo) return <p className="p-4">Vehículo no encontrado.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="bg-gray-900 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold">
          {vehiculo.marca} {vehiculo.modelo} — {vehiculo.patente}
        </h2>
        <p className="text-sm text-gray-300">
          Tipo: {vehiculo.tipo} · Año: {vehiculo.anio}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Chofer seleccionado: <strong>{choferId}</strong>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Asignar al vehículo completo</h3>
          <button
            onClick={() =>
              router.push(
                `cubiertas/servicios`
              )
            }
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Asignar servicio al vehículo
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">O elegir una cubierta</h3>
          {cubiertas.length === 0 ? (
            <p>No hay cubiertas registradas para este vehículo.</p>
          ) : (
            <ul className="grid gap-3">
              {cubiertas.map((c) => (
                <li key={c._id} className="bg-gray-800 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{c.marca} — {c.medida}</p>
                      <p className="text-sm text-gray-300">
                        Posición: {c.posicion} · Estado: {c.estado}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            `cubiertas/${c._id}/servicios`
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                      >
                        Asignar a esta cubierta
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
