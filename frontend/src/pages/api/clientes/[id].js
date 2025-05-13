export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const response = await fetch(`http://localhost:2030/cliente/${id}`);

      if (!response.ok) {
        return res.status(response.status).json({ error: "Cliente no encontrado" });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error en GET por ID:", error);
      return res.status(500).json({ error: "Error al obtener el cliente" });
    }
  }

  else if (req.method === "PUT") {
    try {
      const body = req.body;
      const response = await fetch(`http://localhost:2030/cliente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`Error PUT: ${response.status}`);

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error en PUT:", error);
      return res.status(500).json({ error: "Error al actualizar el cliente" });
    }
  }

  else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}