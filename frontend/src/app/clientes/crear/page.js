"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CrearCliente() {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (res.ok) {
        Swal.fire("Éxito", "Cliente creado correctamente", "success");
        router.push("/clientes");
      } else {
        throw new Error("Error al crear el cliente");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el cliente", "error");
    }
  };

  return (
    <div>
      <h1>Nuevo Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={cliente.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="telefono" value={cliente.telefono} onChange={handleChange} placeholder="Teléfono" required />
        <input type="email" name="email" value={cliente.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="direccion" value={cliente.direccion} onChange={handleChange} placeholder="Dirección" required />
        <button type="submit">Crear Cliente</button>
      </form>
    </div>
  );
}
