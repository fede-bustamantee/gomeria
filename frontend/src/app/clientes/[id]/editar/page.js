"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function EditarCliente({ params }) {
  const router = useRouter();
  const { id } = use(params); // Accede al parámetro correctamente

  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/clientes/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error("Error al cargar cliente:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
      .then(res => res.json())
      .then(() => router.push("/clientes"))
      .catch(err => console.error("Error al actualizar cliente:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Editar Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="nombre" value={cliente.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border" required />
        <input name="telefono" value={cliente.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full p-2 border" />
        <input name="email" value={cliente.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
        <input name="direccion" value={cliente.direccion} onChange={handleChange} placeholder="Dirección" className="w-full p-2 border" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Guardar cambios</button>
      </form>
    </div>
  );
}
