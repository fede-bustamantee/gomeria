"use client";

import Link from "next/link";

export default function AsignarServicios() {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Asignar Servicios</h1>
            <p className="mb-6 text-gray-300">
                Selecciona si deseas asignar un servicio a un <strong>Cliente</strong> o a una <strong>Flota</strong>.
            </p>

            <div className="flex flex-col gap-4">
                <Link href="/servicios/asignar/clientes">
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                        Asignar a Clientes
                    </button>
                </Link>

                <Link href="/servicios/asignar/flotas">
                    <button className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                        Asignar a Flotas
                    </button>
                </Link>
            </div>
        </div>
    );
}