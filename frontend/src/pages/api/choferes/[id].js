export default async (req, res) => {
  const { id } = req.query;
  const base = `http://localhost:2030/chofer/${id}`;
  if (["GET","PUT","DELETE"].includes(req.method)) {
    const resp = await fetch(base, {
      method: req.method,
      headers: req.method !== "GET" ? {"Content-Type":"application/json"} : undefined,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });
    return res.status(resp.ok ? 200 : resp.status).json(await resp.json());
  }
  res.setHeader("Allow", ["GET","PUT","DELETE"]);
  res.status(405).end("Método no permitido");
};
