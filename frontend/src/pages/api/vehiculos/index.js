export default async function handler(req, res) {
    const { method } = req;

    if (method === "GET") {
        try {
            const response = await fetch("http://localhost:2030/vehiculo");
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener vehículos:", error);
            return res.status(500).json({ error: "Error al obtener vehículos" });
        }
    }

    else if (method === "POST") {
        try {
            const data = req.body;
            const response = await fetch("http://localhost:2030/vehiculo", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            const responseData = await response.json();
            return res.status(201).json(responseData);
        } catch (error) {
            console.error("Error al crear vehículo:", error);
            return res.status(500).json({ error: "Error al crear vehículo" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Método ${method} no permitido`);
    }
}