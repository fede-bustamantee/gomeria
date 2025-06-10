"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarVehiculo() {
  const { vehiculoid } = useParams();
  const router = useRouter();

  const [vehiculo, setVehiculo] = useState(null);
  const [cubiertas, setCubiertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiculoRes = await fetch(`/api/vehiculos/${vehiculoid}`);
        const vehiculoData = await vehiculoRes.json();

        const cubiertasRes = await fetch(`/api/cubiertas/vehiculo/${vehiculoid}`);
        const cubiertasData = await cubiertasRes.json();

        setVehiculo(vehiculoData);
        setCubiertas(Array.isArray(cubiertasData) ? cubiertasData : []);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        alert("Error al cargar los datos del vehículo");
        setLoading(false);
      }
    };

    if (vehiculoid) {
      fetchData();
    }
  }, [vehiculoid]);

  const handleVehiculoChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleCubiertaChange = (index, field, value) => {
    const updated = [...cubiertas];
    updated[index][field] = value;
    setCubiertas(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Actualizar vehículo
      const vehiculoRes = await fetch(`/api/vehiculos/${vehiculoid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehiculo),
      });

      if (!vehiculoRes.ok) {
        throw new Error("Error al actualizar el vehículo");
      }

      // Actualizar cubiertas
      const cubiertaPromises = cubiertas.map(cubierta => 
        fetch(`/api/cubiertas/${cubierta._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cubierta),
        })
      );

      await Promise.all(cubiertaPromises);

      alert("Vehículo actualizado correctamente");
      router.back();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el vehículo");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) return <p className="p-4 text-white">Cargando...</p>;
  if (!vehiculo) return <p className="p-4 text-white">Vehículo no encontrado.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-800 text-white rounded">
      <h2 className="text-2xl font-bold mb-4">Editar Vehículo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Patente</label>
            <input 
              name="patente" 
              value={vehiculo.patente || ""} 
              onChange={handleVehiculoChange} 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
              placeholder="Patente"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input 
              name="marca" 
              value={vehiculo.marca || ""} 
              onChange={handleVehiculoChange} 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
              placeholder="Marca"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input 
              name="modelo" 
              value={vehiculo.modelo || ""} 
              onChange={handleVehiculoChange} 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
              placeholder="Modelo"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Año</label>
            <input 
              name="anio" 
              type="number"
              value={vehiculo.anio || ""} 
              onChange={handleVehiculoChange} 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
              placeholder="Año"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <input 
              name="tipo" 
              value={vehiculo.tipo || ""} 
              onChange={handleVehiculoChange} 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" 
              placeholder="Tipo de vehículo"
              required
            />
          </div>
        </div>

        {cubiertas.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-4">Cubiertas</h3>
            {cubiertas.map((cub, i) => (
              <div key={cub._id} className="border border-gray-600 rounded p-4 mb-4 bg-gray-750">
                <h4 className="font-medium mb-3">Cubierta {i + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Marca</label>
                    <input
                      value={cub.marca || ""}
                      onChange={(e) => handleCubiertaChange(i, "marca", e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Marca de la cubierta"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Medida</label>
                    <input
                      value={cub.medida || ""}
                      onChange={(e) => handleCubiertaChange(i, "medida", e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Medida"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Dibujo</label>
                    <input
                      value={cub.dibujo || ""}
                      onChange={(e) => handleCubiertaChange(i, "dibujo", e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Dibujo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                      value={cub.estado || ""}
                      onChange={(e) => handleCubiertaChange(i, "estado", e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Estado"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Posición</label>
                    <input
                      value={cub.posicion || ""}
                      onChange={(e) => handleCubiertaChange(i, "posicion", e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Posición en el vehículo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          
          <button 
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}