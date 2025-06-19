export default async function handler(req, res) {
  const base = "http://localhost:2030/flota";
  if (req.method === "GET") {
    const resp = await fetch(base);
    return res.status(200).json(await resp.json());
  }
  if (req.method === "POST") {
    const resp = await fetch(base, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(req.body)
    });
    return res.status(resp.ok ? 201 : resp.status).json(await resp.json());
  }
  res.setHeader("Allow", ["GET","POST"]);
  res.status(405).end("Método no permitido");
}