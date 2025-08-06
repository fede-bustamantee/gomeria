export default async function handler(req, res) {
    const { id } = req.query;
    const base = `http://localhost:2030/asignar-servicio/${id}`;

    if (req.method === "GET") {
        try {
            const response = await fetch(base);
            const data = await response.json();
            return res.status(response.ok ? 200 : 404).json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Error al obtener el servicio asignado",
                detalles: error.message,
            });
        }
    }

    if (req.method === "PUT") {
        try {
            const response = await fetch(base, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();
            return res.status(response.ok ? 200 : 400).json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Error al actualizar servicio asignado",
                detalles: error.message,
            });
        }
    }

    if (req.method === "DELETE") {
        try {
            const response = await fetch(base, { method: "DELETE" });
            const data = await response.json();
            return res.status(response.ok ? 200 : 400).json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Error al eliminar servicio asignado",
                detalles: error.message,
            });
        }
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Método ${req.method} no permitido`);
}