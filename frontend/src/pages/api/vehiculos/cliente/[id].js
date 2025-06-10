export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch(`http://localhost:2030/vehiculo/cliente/${id}`);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener vehículos del cliente:", error);
            return res.status(500).json({ error: "Error al obtener vehículos del cliente" });
        }
    }

    else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}