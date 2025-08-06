export default async function handler(req, res) {
    const { id } = req.query;
    const url = `http://localhost:2030/servicio/${id}`;

    if (req.method === "GET") {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener servicio:", error);
            return res.status(500).json({ error: "Error al obtener servicio" });
        }
    }

    else if (req.method === "PUT") {
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(req.body),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al actualizar servicio:", error);
            return res.status(500).json({ error: "Error al actualizar servicio" });
        }
    }

    else if (req.method === "DELETE") {
        try {
            const response = await fetch(url, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al eliminar servicio:", error);
            return res.status(500).json({ error: "Error al eliminar servicio" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
