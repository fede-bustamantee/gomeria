"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NuevoVehiculoParaFlota() {
    const { id } = useParams(); // ID de la flota
    const router = useRouter();

    const [vehiculo, setVehiculo] = useState({
        patente: "",
        marca: "",
        modelo: "",
        anio: "",
        tipo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehiculo({ ...vehiculo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoVehiculo = { ...vehiculo, flotaId: id };

        try {
            const res = await fetch("/api/vehiculos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoVehiculo),
            });

            if (!res.ok) throw new Error("Error al crear vehículo");

            alert("Vehículo creado correctamente");
            router.push(`/flotas/${id}/vehiculos`);
        } catch (error) {
            console.error("Error al crear vehículo:", error);
            alert("Hubo un error al guardar el vehículo");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-800 text-white rounded">
            <h2 className="text-2xl font-bold mb-4">Nuevo Vehículo para la Flota</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["patente", "marca", "modelo", "anio", "tipo"].map((campo) => (
                    <div key={campo}>
                        <label className="block capitalize mb-1">{campo}</label>
                        <input
                            type={campo === "anio" ? "number" : "text"}
                            name={campo}
                            value={vehiculo[campo]}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            placeholder={`Ingrese ${campo}`}
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Guardar Vehículo
                </button>
            </form>
        </div>
    );
}