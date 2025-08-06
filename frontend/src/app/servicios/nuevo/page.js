"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearServicio() {
    const [servicio, setServicio] = useState({
        tipo: "",
        descripcion: "",
        costo: "",
        fecha: "",
        observaciones: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServicio({ ...servicio, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/servicios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(servicio),
        });

        if (res.ok) {
            alert("Servicio creado correctamente");
            router.push("/servicios"); // podés cambiarlo si usás otra ruta
        } else {
            alert("Error al crear servicio");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-800 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Crear Servicio</h2>
            <form onSubmit={handleSubmit} className="space-y-4">


                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción Servicio"
                    value={servicio.descripcion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo vehiculo"
                    value={servicio.tipo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="costo"
                    placeholder="Costo ($)"
                    value={servicio.costo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />

                <textarea
                    name="observaciones"
                    placeholder="Observaciones"
                    value={servicio.observaciones}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Crear Servicio
                </button>
            </form>
        </div>
    );
}
