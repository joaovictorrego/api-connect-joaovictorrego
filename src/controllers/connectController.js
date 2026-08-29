import { connections } from "../data/connectData.js";

export function listConnections(req, res) {
  res.status(200).json({
    data: connections,
    total: connections.length
  });
}

export function getConnectionById(req, res) {
  const id = Number(req.params.id);
  const connection = connections.find((item) => item.id === id);

  if (!connection) {
    return res.status(404).json({
      error: "Conexão não encontrada"
    });
  }

  return res.status(200).json({ data: connection });
}
