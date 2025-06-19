export default async function handler(req, res) {
  const { id } = req.query;
  const base = `http://localhost:2030/flota/${id}`;
  if (req.method === "GET" || req.method === "PUT" || req.method === "DELETE") {
    const resp = await fetch(base, {
      method: req.method,
      headers: req.method !== "GET" ? {"Content-Type":"application/json"} : undefined,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });
    return res.status(resp.ok ? (req.method==="DELETE"?200:200) : resp.status).json(await resp.json());
  }
  res.setHeader("Allow", ["GET","PUT","DELETE"]);
  res.status(405).end("Método no permitido");
}
