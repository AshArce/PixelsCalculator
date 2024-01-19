export default function unknownEndpoint(req, res) {
  console.log(`Unknown endpoint: ${req.method} ${req.url}`);
  return res.status(404).send({ error: "unknown endpoint" });
}
