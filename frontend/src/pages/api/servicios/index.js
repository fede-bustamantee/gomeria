export default async function handler(req, res) {
    const base = "http://localhost:2030/servicio";

    if (req.method === "GET") {
        try {
            const response = await fetch(base);
            const data = await response.json();

            if (!Array.isArray(data)) {
                return res.status(500).json({ error: "La respuesta del backend no es un array" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los servicios", detalles: error.message });
        }
    }

    if (req.method === "POST") {
        try {
            const servicioData = req.body;

            const response = await fetch(base, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(servicioData), // directamente el objeto con vehiculoId, cubiertaId, etc.
            });

            const data = await response.json();
            return res.status(response.ok ? 201 : 400).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error al crear el servicio", detalles: error.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end("Método no permitido");
}