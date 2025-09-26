"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SeleccionarCliente() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch("/api/clientes")
            .then(res => res.json())
            .then(setClientes)
            .catch(err => console.error("Error cargando clientes:", err));
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Seleccionar Cliente</h1>

            <ul className="space-y-4">
                {clientes.map(cliente => (
                    <li key={cliente._id} className="p-4 border rounded shadow">
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <Link href={`clientes/${cliente._id}/vehiculos`}>
                            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Seleccionar
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}