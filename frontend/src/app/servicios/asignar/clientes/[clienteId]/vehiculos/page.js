"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SeleccionarVehiculo() {
  const { clienteId } = useParams();
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`/api/vehiculos/cliente/${clienteId}`)
      .then(res => res.json())
      .then(data => setVehiculos(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error al obtener vehículos:", err));
  }, [clienteId]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seleccionar Vehículo</h1>

      <ul className="space-y-4">
        {vehiculos.map(v => (
          <li key={v._id} className="p-4 border rounded shadow">
            <p><strong>Patente:</strong> {v.patente}</p>
            <p><strong>Marca:</strong> {v.marca}</p>
            <Link href={`vehiculos/${v._id}/cubiertas`}>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Seleccionar
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
