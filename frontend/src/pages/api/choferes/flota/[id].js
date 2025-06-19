export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch("http://localhost:2030/chofer");
            const todos = await response.json();

            const filtrados = todos.filter((c) => c.flotaId?._id === id);

            res.status(200).json(filtrados);
        } catch (error) {
            console.error("Error al obtener choferes por flota:", error);
            res.status(500).json({ error: "Error al obtener los choferes", detalles: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
