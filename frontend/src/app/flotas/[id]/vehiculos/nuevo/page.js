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
        setCubiertas([
            ...cubiertas,
            { marca: "", medida: "", dibujo: "", estado: "", posicion: "" },
        ]);
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
                body: JSON.stringify({ ...vehiculo, flotaId: id }),
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

            alert("Vehículo y cubiertas creados correctamente");
            router.push(`/flotas/${id}/vehiculos`);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al guardar el vehículo");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-800 text-white rounded">
            <h2 className="text-2xl font-bold mb-4">Nuevo Vehículo para la Flota</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Datos del vehículo */}
                {["patente", "marca", "modelo", "anio", "tipo"].map((campo) => (
                    <div key={campo}>
                        <label className="block capitalize mb-1">{campo}</label>
                        <input
                            type={campo === "anio" ? "number" : "text"}
                            name={campo}
                            value={vehiculo[campo]}
                            onChange={handleVehiculoChange}
                            required={campo === "patente"}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            placeholder={`Ingrese ${campo}`}
                        />
                    </div>
                ))}

                {/* Cubiertas */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Cubiertas</h3>
                    {cubiertas.map((cubierta, i) => (
                        <div
                            key={i}
                            className="mb-4 border p-3 rounded bg-gray-700 space-y-2"
                        >
                            {["marca", "medida", "dibujo", "estado", "posicion"].map((c) => (
                                <input
                                    key={c}
                                    name={c}
                                    placeholder={c}
                                    value={cubierta[c]}
                                    onChange={(e) => handleCubiertaChange(i, e)}
                                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => eliminarCubierta(i)}
                                className="text-red-400 text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={agregarCubierta}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        + Agregar Cubierta
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Guardar Vehículo
                </button>
            </form>
        </div>
    );
}
