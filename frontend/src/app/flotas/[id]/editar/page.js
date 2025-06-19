"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarFlota() {
    const { id } = useParams(), router = useRouter();
    const [f, setF] = useState(null);
    useEffect(() => {
        fetch(`/api/flotas/${id}`).then(r => r.json()).then(setF);
    }, []);
    const onSubmit = async e => {
        e.preventDefault();
        await fetch(`/api/flotas/${id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(f)
        });
        router.back();
    };
    if (!f) return <p>Cargando...</p>;
    return (
        <form onSubmit={onSubmit}>
            {["nombre", "contacto", "direccion"].map(k => (
                <input key={k} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} placeholder={k} required />
            ))}
            <button type="submit">Guardar</button>
        </form>
    );
}
