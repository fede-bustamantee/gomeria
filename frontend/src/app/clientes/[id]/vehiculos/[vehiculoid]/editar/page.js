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

      // Guardar cubiertas (PUT si tiene _id, POST si es nueva)
      for (const cubierta of cubiertas) {
        if (cubierta._id) {
          await fetch(`/api/cubiertas/${cubierta._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cubierta),
          });
        } else {
          await fetch(`/api/cubiertas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...cubierta, vehiculoId: vehiculoid }),
          });
        }
      }

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

  const handleDeleteCubierta = async (index) => {
    const cubierta = cubiertas[index];
    const updated = [...cubiertas];
    updated.splice(index, 1);
    setCubiertas(updated);

    if (cubierta._id) {
      try {
        await fetch(`/api/cubiertas/${cubierta._id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Error eliminando cubierta:", err);
      }
    }
  };

  const handleAgregarCubierta = () => {
    setCubiertas([
      ...cubiertas,
      {
        _id: null,
        marca: "",
        medida: "",
        dibujo: "",
        estado: "",
        posicion: "",
      },
    ]);
  };

  if (loading) return <p className="p-4 text-white">Cargando...</p>;
  if (!vehiculo) return <p className="p-4 text-white">Vehículo no encontrado.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-800 text-white rounded">
      <h2 className="text-2xl font-bold mb-4">Editar Vehículo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Datos del vehículo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["patente", "marca", "modelo", "anio", "tipo"].map((field, i) => (
            <div key={i} className={field === "tipo" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                name={field}
                type={field === "anio" ? "number" : "text"}
                value={vehiculo[field] || ""}
                onChange={handleVehiculoChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder={field}
                required
              />
            </div>
          ))}
        </div>

        {/* Cubiertas */}
        <div>
          <h3 className="text-lg font-semibold mt-6 mb-4">Cubiertas</h3>

          {cubiertas.length === 0 ? (
            <p className="text-gray-400 mb-3">No hay cubiertas asociadas a este vehículo.</p>
          ) : (
            cubiertas.map((cub, i) => (
              <div key={i} className="border border-gray-600 rounded p-4 mb-4 bg-gray-750">
                <h4 className="font-medium mb-3">Cubierta {i + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["marca", "medida", "dibujo", "estado", "posicion"].map((campo, j) => (
                    <div key={j} className={campo === "posicion" ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium mb-1 capitalize">{campo}</label>
                      <input
                        value={cub[campo] || ""}
                        onChange={(e) => handleCubiertaChange(i, campo, e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        placeholder={campo}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteCubierta(i)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mt-4"
                >
                  Eliminar Cubierta
                </button>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={handleAgregarCubierta}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
          >
            + Agregar Cubierta
          </button>
        </div>

        {/* Botones */}
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
