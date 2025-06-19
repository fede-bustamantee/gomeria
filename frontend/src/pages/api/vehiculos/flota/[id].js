export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch("http://localhost:2030/vehiculo");
            const todos = await response.json();

            // Filtrar por flotaId._id
            const filtrados = todos.filter(v => v.flotaId?._id === id);

            res.status(200).json(filtrados);
        } catch (error) {
            console.error("Error al obtener vehículos por flota:", error);
            res.status(500).json({ error: "Error al obtener los vehículos", detalles: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}