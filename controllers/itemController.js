import Item from "../models/Item.js";

async function getItemInfo(_req, res) {
  try {
    const items = await Item.find({});
    const itemsCount = items.length;

    return res.send(
      `<p>Item App has ${itemsCount} item${itemsCount !== 1 ? "s" : ""}</p>`
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getItems(_req, res, next) {
  try {
    const items = await Item.find();

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getItem(req, res, next) {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json(item);
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  const id = req.params.id;

  try {
    await Item.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createItem(req, res, next) {
  const body = req.body;

  if (!body.itemName) {
    return res.status(400).json({ error: "Content missing" });
  }
  try {
    const item = new Item({
      itemName: body.itemName,
      itemType: body.itemType,
      seedCost: body.seedCost,
      energyCost: body.energyCost,
      sellValue: body.sellValue,
    });

    const savedItem = await item.save().then((result) => result);
    return res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateItem(req, res, next) {
  const id = req.params.id;
  const { itemName, itemType, seedCost, energyCost, sellValue } = req.body;
  const item = {
    itemName,
    itemType,
    seedCost,
    energyCost,
    sellValue,
  };
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item, {
      new: true,
      runValidatiors: true,
      context: "query",
    });

    if (!updatedItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    return res.statust(404).json(updatedItem);
  } catch (error) {
    next(error);
  }
}

export default {
  getItemInfo,
  getItems,
  getItem,
  deleteItem,
  createItem,
  updateItem,
};
