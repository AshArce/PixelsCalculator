import Item from "../models/Item.js";

async function getItems(_req, res, next) {
  try {
    const items = await Item.find();

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getItem(id) {
  try {
    const item = await Item.findById(id);

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  } catch (error) {
    console.error(`Error getting item by ID (${id}):`, error);
    next(error);
  }
}

async function deleteItem(id) {
  try {
    await Item.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting item by ID (${id}):`, error);
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
    console.error("Error creating item:", error);
    next(error); // Rethrow the exception
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
    const existingItem = await Item.findById(id);

    if (!existingItem) {
      return res.status(404).send({ error: "Item not found" });
    }

    Object.assign(existingItem, item); // Update properties
    const updatedItem = await existingItem.save();

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error(`Error updating item by ID (${id}):`, error);
    next(error); // Rethrow the exception
  }
}

export default {
  getItems,
  getItem,
  deleteItem,
  createItem,
  updateItem,
};
