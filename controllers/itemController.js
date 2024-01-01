import Item from "../models/Item.js";

let Items = [];

async function getItemInfo(_req, res) {
  const itemCount = Items.length;

  return res.send(`<p>item App have ${itemCount} item</p>`);
}
async function getItems(_req, res) {
  return res.json(items);
}
async function getItem(req, res) {
  const id = Number(req.params.id);
  const item = await Item.findById(id).then((item) => item);

  return res.json(item);
}
async function deleteItem(_req, res) {
  const id = Number(req.params.id);
  await Item.findByIdAndDelete(id);

  return res.status(204).end();
}
async function createItem(req, res) {
  const body = req.body;

  if (!body.itemName) {
    return res.status(400).json({ error: "content missing" });
  }

  const newItem = {
    itemName: body.itemName,
    itemType: body.itemType,
    seedCost: body.seedCost,
    energyCost: body.energyCost,
    sellValue: body.sellValue,
  };

  // Corrected the variable name from 'item' to 'items'
  const addedItem = Items.concat(newItem);

  return res.status(201).json(addedItem);
}

async function updateItem(req, res) {
  const id = Number(req.params.id);
  const { itemName, itemType, seedCost, energyCost, sellValue } = req.body;

  const item = {
    itemName,
    itemType,
    seedCost,
    energyCost,
    sellValue,
  };

  const updatedItem = await Item.findByIdAndUpdate(id, item, {}).then(
    (result) => result
  );

  return res.status(200).json(updatedItem);
}

export default {
  getItemInfo,
  getItems,
  getItem,
  deleteItem,
  createItem,
  updateItem,
};
