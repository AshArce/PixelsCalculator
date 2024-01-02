import app from "./app.js";
import config from "./utility/config.js";

const PORT = config.PORT || 3001;

app.get("/", (_req, res) => {
  return res.send("<h1>Pixels Calculator Backend</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
