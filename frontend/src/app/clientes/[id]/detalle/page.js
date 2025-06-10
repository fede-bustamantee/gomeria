// app/clientes/[id]/detalle/page.js
"use client";

import { use, useEffect, useState } from "react";

export default function DetalleCliente({ params }) {
  const { id } = use(params);

  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/clientes/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error("Error al cargar detalle:", err));
  }, [id]);

  if (!cliente) return <div className="p-4 text-white">Cargando...</div>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Detalle del Cliente</h2>
      <p><strong>Nombre:</strong> {cliente.nombre}</p>
      <p><strong>Teléfono:</strong> {cliente.telefono || "N/A"}</p>
      <p><strong>Email:</strong> {cliente.email || "N/A"}</p>
      <p><strong>Dirección:</strong> {cliente.direccion || "N/A"}</p>
    </div>
  );
}
