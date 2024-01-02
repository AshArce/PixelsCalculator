export default function errorHandler(error, req, res, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformated Id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
}
