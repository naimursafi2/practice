const productSchema = require("../model/productSchema");
const { findOne } = require("../model/productSchema");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      price,
      discountPersentage,
      variants,
      tags,
      isActive,
    } = req.body;
    const images = req?.file.images;
    const thumbnail = req?.file.thumbnail;

    if (!title)
      return res.status(400).send({ message: "Product title is required" });
    if (!slug)
      return res.status(400).send({ message: "Product slug is required" });
    const isSlugExist = await productSchema.findOne({
      slug: slug.toLowerCase(),
    });
    if (isSlugExist)
      return res.status(400).send({ message: "slug already exist" });
    if (!description)
      return res
        .status(400)
        .send({ message: "Product description is required" });
    if (!category)
      return res.status(400).send({ message: "Product category is required" });
    const isCategoryExit = await categorySchema.findById(category);
    if (!isCategoryExit)
      return res.status(400).send({ message: "Invalid Category" });
    if (!price)
      return res.status(400).send({ message: "Product price is required" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Inernal Server Error" });
  }
};

module.exports = { createProduct };
