export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch(`http://localhost:2030/vehiculo/${id}`);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener vehículo:", error);
            return res.status(500).json({ error: "Error al obtener vehículo" });
        }
    }

    else if (req.method === "PUT") {
        try {
            const body = req.body;
            const response = await fetch(`http://localhost:2030/vehiculo/${id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al actualizar vehículo:", error);
            return res.status(500).json({ error: "Error al actualizar vehículo" });
        }
    }

    else if (req.method === "DELETE") {
        try {
            const response = await fetch(`http://localhost:2030/vehiculo/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al eliminar vehículo:", error);
            return res.status(500).json({ error: "Error al eliminar vehículo" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}