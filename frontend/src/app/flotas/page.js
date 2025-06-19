"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FlotasPage() {
  const [flotas, setFlotas] = useState([]);

  useEffect(() => {
    fetch("/api/flotas").then(r => r.json()).then(setFlotas);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Flotas</h1>
        <Link href="/flotas/nuevo">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Crear Flota
          </button>
        </Link>
      </div>

      <ul className="space-y-4">
        {flotas.map(f => (
          <li
            key={f._id}
            className="border rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-lg">{f.nombre}</p>
              <p className="text-gray-600">{f.contacto}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/flotas/${f._id}/editar`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Editar
                </button>
              </Link>
              <Link href={`/flotas/${f._id}/detalle`}>
                <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800">
                  Detalle
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}