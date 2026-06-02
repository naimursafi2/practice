const categorySchema = require("../model/categorySchema");

const createCategory = async (req, res) => {
  const { title } = req.body;
  try {
    if (!title?.trim()) {
      return res.status(400).send({ message: "category title is required" });
    }
    const category = await categorySchema.create({ title });
    res.status(200).send({ message: "category created", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await categorySchema.find({});
    res.status(200).send(categories)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

module.exports = { createCategory, getAllCategory };
