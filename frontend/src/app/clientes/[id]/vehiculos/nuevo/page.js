"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NuevoVehiculo() {
    const router = useRouter();
    const { id } = useParams();

    const [vehiculo, setVehiculo] = useState({
        patente: "",
        marca: "",
        modelo: "",
        anio: "",
        tipo: "",
    });

    const [cubiertas, setCubiertas] = useState([]);

    const handleVehiculoChange = (e) => {
        const { name, value } = e.target;
        setVehiculo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCubiertaChange = (index, e) => {
        const { name, value } = e.target;
        const nuevasCubiertas = [...cubiertas];
        nuevasCubiertas[index][name] = value;
        setCubiertas(nuevasCubiertas);
    };

    const agregarCubierta = () => {
        setCubiertas([...cubiertas, { marca: "", medida: "", dibujo: "", estado: "", posicion: "" }]);
    };

    const eliminarCubierta = (index) => {
        const nuevasCubiertas = [...cubiertas];
        nuevasCubiertas.splice(index, 1);
        setCubiertas(nuevasCubiertas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Crear vehículo
            const resVehiculo = await fetch("/api/vehiculos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...vehiculo, clienteId: id }),
            });

            if (!resVehiculo.ok) throw new Error("Error al crear vehículo");

            const nuevoVehiculo = await resVehiculo.json();

            // 2. Crear cubiertas asociadas si hay alguna
            if (cubiertas.length > 0) {
                for (const cubierta of cubiertas) {
                    await fetch("/api/cubiertas", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...cubierta, vehiculoId: nuevoVehiculo._id }),
                    });
                }
            }

            router.push(`/clientes/${id}/vehiculos`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Agregar Vehículo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Vehículo */}
                <input name="patente" placeholder="Patente" value={vehiculo.patente} onChange={handleVehiculoChange} className="w-full p-2 border" required />
                <input name="marca" placeholder="Marca" value={vehiculo.marca} onChange={handleVehiculoChange} className="w-full p-2 border" />
                <input name="modelo" placeholder="Modelo" value={vehiculo.modelo} onChange={handleVehiculoChange} className="w-full p-2 border" />
                <input name="anio" type="number" placeholder="Año" value={vehiculo.anio} onChange={handleVehiculoChange} className="w-full p-2 border" />
                <input name="tipo" placeholder="Tipo de Vehículo" value={vehiculo.tipo} onChange={handleVehiculoChange} className="w-full p-2 border" />

                {/* Cubiertas */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Cubiertas</h3>
                    {cubiertas.map((cubierta, i) => (
                        <div key={i} className="mb-4 border p-3 rounded bg-gray-800">
                            <input name="marca" placeholder="Marca" value={cubierta.marca} onChange={(e) => handleCubiertaChange(i, e)} className="w-full mb-1 p-2 border" />
                            <input name="medida" placeholder="Medida" value={cubierta.medida} onChange={(e) => handleCubiertaChange(i, e)} className="w-full mb-1 p-2 border" />
                            <input name="dibujo" placeholder="Dibujo" value={cubierta.dibujo} onChange={(e) => handleCubiertaChange(i, e)} className="w-full mb-1 p-2 border" />
                            <input name="estado" placeholder="Estado" value={cubierta.estado} onChange={(e) => handleCubiertaChange(i, e)} className="w-full mb-1 p-2 border" />
                            <input name="posicion" placeholder="Posición (ej: delantera izquierda)" value={cubierta.posicion} onChange={(e) => handleCubiertaChange(i, e)} className="w-full mb-1 p-2 border" />
                            <button type="button" onClick={() => eliminarCubierta(i)} className="text-red-600 text-sm">Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={agregarCubierta} className="bg-blue-500 text-white px-3 py-1 rounded">+ Agregar Cubierta</button>
                </div>

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Guardar Vehículo</button>
            </form>
        </div>
    );
}