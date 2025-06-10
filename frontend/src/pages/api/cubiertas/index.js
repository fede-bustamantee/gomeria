// pages/api/cubiertas/index.js
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await fetch("http://localhost:2030/cubierta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Error al crear la cubierta");
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error("Error al crear cubierta:", error);
            return res.status(500).json({ error: "Error al crear la cubierta" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}