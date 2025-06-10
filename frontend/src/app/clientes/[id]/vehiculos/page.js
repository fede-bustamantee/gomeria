"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function VehiculosPorCliente({ params }) {
  const { id } = use(params);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vehiculos/cliente/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehiculos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar vehículos:", err);
        setVehiculos([]);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (vehiculoId, patente) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el vehículo ${patente}?`)) {
      try {
        const response = await fetch(`/api/vehiculos/${vehiculoId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Actualizar la lista eliminando el vehículo
          setVehiculos(vehiculos.filter(v => v._id !== vehiculoId));
          alert('Vehículo eliminado correctamente');
        } else {
          throw new Error('Error al eliminar el vehículo');
        }
      } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        alert('Error al eliminar el vehículo');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Vehículos del Cliente</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : vehiculos.length === 0 ? (
        <p>No hay vehículos para este cliente.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border">Patente</th>
              <th className="p-2 border">Marca</th>
              <th className="p-2 border">Modelo</th>
              <th className="p-2 border">Año</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v, i) => (
              <tr key={i} className="bg-gray-700 border-b text-white">
                <td className="p-2">{v.patente}</td>
                <td className="p-2">{v.marca}</td>
                <td className="p-2">{v.modelo}</td>
                <td className="p-2">{v.anio}</td>
                <td className="p-2">{v.tipo}</td>
                <td className="p-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <Link href={`/clientes/${id}/vehiculos/${v._id}/detalle`}>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">
                        Detalle
                      </button>
                    </Link>
                    
                    <Link href={`/clientes/${id}/vehiculos/${v._id}/editar`}>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm">
                        Editar
                      </button>
                    </Link>
                    
                    <button 
                      onClick={() => handleDelete(v._id, v.patente)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link href={`/clientes/${id}/vehiculos/nuevo`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          + Agregar Vehículo
        </button>
      </Link>
    </div>
  );
}