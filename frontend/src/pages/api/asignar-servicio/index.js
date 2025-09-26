export default async function handler(req, res) {
    const base = "http://localhost:2030/asignar-servicio";

    if (req.method === "GET") {
        try {
            // Tomamos query params del request (ej: ?flotaId=123)
            const queryParams = new URLSearchParams(req.query).toString();
            const url = queryParams ? `${base}?${queryParams}` : base;

            const response = await fetch(url);
            const data = await response.json();

            if (!Array.isArray(data)) {
                return res.status(500).json({ error: "La respuesta del backend no es un array" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Error al obtener servicios asignados",
                detalles: error.message,
            });
        }
    }

    if (req.method === "POST") {
        try {
            const response = await fetch(base, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();
            return res.status(response.ok ? 201 : 400).json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Error al asignar servicio",
                detalles: error.message,
            });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
}