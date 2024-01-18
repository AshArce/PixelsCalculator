import Land from "../models/Land.js";

async function getLands(_req, res, next) {
  try {
    const lands = await Land.find();

    return res.status(200).json(lands);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getLand(req, res, next) {
  const id = req.params.id;

  try {
    const land = await Land.findById(id);

    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }

    return res.json(land);
  } catch (error) {
    next(error);
  }
}

async function deleteLand(req, res, next) {
  const id = req.params.id;

  try {
    await Land.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createLand(req, res, next) {
  const body = req.body;

  if (!body.landNumber) {
    return res.status(400).json({ error: "Content missing" });
  }
  try {
    const land = new Land({
      landNumber: body.landNumber,
      landDescription: body.landDescription,
      landType: body.landType,
      landIndustries: body.landIndustries,
    });

    const savedItem = await land.save().then((result) => result);
    return res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateLand(req, res, next) {
  const id = req.params.id;
  const { landNumber, landDescription, landType, landIndustries } = req.body;
  const land = {
    landNumber,
    landDescription,
    landType,
    landIndustries,
  };
  try {
    const updatedLand = await Land.findByIdAndUpdate(id, land, {
      new: true,
      runValidatiors: true,
      context: "query",
    });

    if (!updatedLand) {
      return res.status(404).send({ error: "Land not found" });
    }

    return res.status(200).json(updatedLand);
  } catch (error) {
    next(error);
  }
}

export default {
  getLands,
  getLand,
  deleteLand,
  createLand,
  updateLand,
};
