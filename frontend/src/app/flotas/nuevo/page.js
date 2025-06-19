"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearFlota() {
  const router = useRouter();
  const [f, setF] = useState({
    nombre: "",
    contacto: "",
    direccion: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/flotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f)
    });
    router.push("/flotas");
  };

  return (
    <form onSubmit={handleSubmit}>
      {["nombre", "contacto", "direccion"].map((k) => (
        <input
          key={k}
          value={f[k]}
          onChange={(e) => setF({ ...f, [k]: e.target.value })}
          placeholder={k}
          required
        />
      ))}
      <button type="submit">Crear</button>
    </form>
  );
}
