let items = [];

function getItemInfo(_req, res) {
  const itemCount = items.length;

  return res.send(`<p>item App have ${itemCount} item</p>`);
}
function getItems(_req, res) {
  return res.json(items);
}
function getItem(req, res) {
  const id = Number(req.params.id);
  const item = items.find((item) => item.id === id);

  return res.json(item);
}
function deleteItem(_req, res) {
  const id = Number(req.params.id);
  items = items.filter((item) => item.id !== id);

  return res.status(204).end();
}
function createItem(_req, res) {
  const body = req.body;

  if (!body.itemName) {
    return res.status(400).json({ error: "content missing" });
  }

  const newItem = {
    id: generateId(items),
    itemName: body.itemName,
    type: body.type,
    seedCost: body.seedCost,
    energyCost: body.energyCost,
    sellValue: body.sellValue,
    favorite: false,
  };

  const addedItem = item.concat(newItem);

  return res.status(201).json(addedItem);
}
function updateFavorite(_req, res) {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    const { favorite } = req.body;
    const updatedItem = {
      ...items[index],
      favorite: favorite !== undefined ? favorite : items[index].favorite,
    };

    item[index] = updatedItem;

    return res.status(200).json(updatedItem);
  } else {
    return res.status(404).json({ error: "Item not found" });
  }
}

export default {
  getItemInfo,
  getItems,
  getItem,
  deleteItem,
  createItem,
  updateFavorite,
};
