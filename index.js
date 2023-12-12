import express from "express";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :body"));

let item = [
  {
    id: 1,
    itemName: "Popberry",
    type: "seed",
    energyCost: 3.5,
    sellValue: 3,
    favorite: false,
  },

  {
    id: 2,
    itemName: "ButterBerry",
    type: "seed",
    energyCost: 3.5,
    sellValue: 5,
    favorite: false,
  },

  {
    id: 3,
    itemName: "Clover",
    type: "seed",
    energyCost: 5,
    sellValue: 6,
    favorite: false,
  },

  {
    id: 4,
    itemName: "Grainbow",
    type: "seed",
    energyCost: 4,
    sellValue: 8,
    favorite: false,
  },

  {
    id: 5,
    itemName: "watermint",
    type: "seed",
    energyCost: 8,
    sellValue: 24,
    favorite: false,
  },
];

function unknownEndpoint(req, res) {
  return res.status(404).send({ error: "unknown endpoint" });
}

function generateId() {
  const maxId = item.length > 0 ? Math.max(...item.map((n) => n.id)) : 0;
  return maxId + 1;
}

app.get("/", (req, res) => {
  return res.send("<h1>Hello from ExpressJS!</h1>");
});

app.get("/item/info", (req, res) => {
  const itemCount = item.length;

  return res.send(`<p>item App have ${itemCount} item</p>`);
});

app.get("/item", (req, res) => {
  return res.json(item);
});

app.get("/item/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = item.find((item) => item.id === id);

  return res.json(item);
});

app.delete("/item/:id", (req, res) => {
  const id = Number(req.params.id);
  item = item.filter((item) => item.id !== id);

  return res.status(204).end();
});

app.post("/item", (req, res) => {
  const body = req.body;

  if (!body.itemName) {
    return res.status(400).json({ error: "content missing" });
  }

  const newItem = {
    id: generateId(),
    itemName: body.itemName,
    type: body.type,
    energyCost: body.energyCost,
    sellValue: body.sellValue,
    favorite: body.favorite || false,
  };

  const addedItem = item.concat(newItem);

  return res.status(201).json(addedItem);
});

app.get("/item/info", (req, res) => {
  const itemCount = item.length;
  console.log(itemCount);

  return res.send(`<p>item App have ${itemCount} item</p>`);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
