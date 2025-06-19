export default async (req, res) => {
  const base = "http://localhost:2030/chofer";
  if (req.method === "GET" || req.method === "POST") {
    const resp = await fetch(base, {
      method: req.method,
      headers: req.method==="POST" ? {"Content-Type":"application/json"} : undefined,
      body: req.body ? JSON.stringify(req.body) : undefined
    });
    return res.status(resp.ok ? (req.method==="POST"?201:200) : resp.status).json(await resp.json());
  }
  res.setHeader("Allow", ["GET","POST"]);
  res.status(405).end("Método no permitido");
};
