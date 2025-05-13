"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [clientesInit, setClientesInit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clientes")
      .then(res => res.json())
      .then(data => {
        console.log("Clientes recibidos:", data);
        setClientes(data);
        setClientesInit(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar clientes:", err);
        setLoading(false);
      });
  }, []);

  const buscarClientes = (e) => {
    const filtro = e.target.value.toLowerCase();
    const filtrados = clientesInit.filter(
      (c) =>
        c.nombre.toLowerCase().includes(filtro) ||
        (c.telefono && c.telefono.toLowerCase().includes(filtro)) ||
        (c.direccion && c.direccion.toLowerCase().includes(filtro))
    );
    setClientes(filtrados);
  };

  const eliminarCliente = (id, cliente) => {
    Swal.fire({
      title: `¿Eliminar a ${cliente.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/api/clientes", {
          method: "DELETE",
          body: id,
        })
          .then(res => res.json())
          .then(() => {
            setClientes(prev => prev.filter(c => c._id !== id));
            Swal.fire("Eliminado", "Cliente eliminado correctamente", "success");
          })
          .catch(error => {
            console.error("Error al eliminar:", error);
            Swal.fire("Error", "No se pudo eliminar el cliente", "error");
          });
      }
    });
  };

  return (
    <div className="h-auto w-full text-white">
      <div className="data-controls flex justify-between items-center mb-4 p-2">
        <input 
          onKeyUp={buscarClientes} 
          type="text" 
          placeholder="Buscar cliente" 
          className="p-2 border rounded bg-write"
        />
        <Link href={"/clientes/crear"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Nuevo cliente
          </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center p-4">Cargando...</div>
      ) : clientes.length === 0 ? (
        <div className="text-center p-4">No hay clientes disponibles</div>
      ) : (
        <table className="menuTable w-full border-collapse">
          <thead>
            <tr className="bg-black">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border" colSpan="3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index} className="bg-black border-b">
                <td className="p-2">{cliente.nombre}</td>
                <td className="p-2">{cliente.telefono || "N/A"}</td>
                <td className="p-2">{cliente.email || "N/A"}</td>
                <td className="p-2">{cliente.direccion || "N/A"}</td>
                <td className="p-2">
                  <button
                    onClick={() => eliminarCliente(cliente._id, cliente)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-full"
                  >
                    Eliminar
                  </button>
                </td>
                <td className="p-2">
                  <Link href={`/clientes/${cliente._id}/editar`}>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-full">
                      Editar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}