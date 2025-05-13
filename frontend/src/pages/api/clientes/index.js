export default async function handler(req, res) {
    const { method } = req;
    const { limit } = req.query;

    if (method === "GET") {
        try {
            const response = await fetch("http://localhost:2030/cliente");
            const data = await response.json();

            const clientes = limit
                ? data.slice(-parseInt(limit, 10)).reverse()
                : data;

            res.status(200).json(clientes);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            res.status(500).json({ error: "Error al obtener los clientes" });
        }
    }

    else if (method === "POST") {
        try {
            const data = req.body;
            const response = await fetch("http://localhost:2030/cliente", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const responseData = await response.json();
            res.status(201).json(responseData);
        } catch (error) {
            console.error("Error al crear cliente:", error);
            res.status(500).json({ error: "Error al crear el cliente" });
        }
    }

    else if (method === "DELETE") {
        try {
            const id = req.body;
            const response = await fetch(`http://localhost:2030/cliente/${id}`, {
                method: "DELETE",
            });

            const responseData = await response.json();
            res.status(200).json(responseData);
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            res.status(500).json({ error: "Error al eliminar el cliente" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Método ${method} no permitido`);
    }
}
