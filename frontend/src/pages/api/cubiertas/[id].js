// pages/api/cubiertas/[id].js
export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch(`http://localhost:2030/cubierta/${id}`);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener cubierta:", error);
            return res.status(500).json({ error: "Error al obtener cubierta" });
        }
    }

    else if (req.method === "PUT") {
        try {
            const body = req.body;
            const response = await fetch(`http://localhost:2030/cubierta/${id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al actualizar cubierta:", error);
            return res.status(500).json({ error: "Error al actualizar cubierta" });
        }
    }

    else if (req.method === "DELETE") {
        try {
            const response = await fetch(`http://localhost:2030/cubierta/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al eliminar cubierta:", error);
            return res.status(500).json({ error: "Error al eliminar cubierta" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}