"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NuevoChofer() {
    const { id: flotaId } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({
        nombre: "", dni: "", telefono: "", licencia: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/choferes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, flotaId })
        });

        if (res.ok) {
            router.push(`/flotas/${flotaId}/choferes`);
        } else {
            alert("Error al crear chofer");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Agregar Chofer</h2>
            {["nombre", "dni", "telefono", "licencia"].map((f) => (
                <input
                    key={f}
                    name={f}
                    value={form[f]}
                    onChange={handleChange}
                    placeholder={f}
                    required
                    className="w-full p-2 mb-2 border rounded"
                />
            ))}
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Crear Chofer
            </button>
        </form>
    );
}
