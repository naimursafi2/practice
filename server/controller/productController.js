const { uploadToCloudinary } = require("../helpers/utils");
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

    //validation of product variants
    const variantsData = variants;
    if (!Array.isArray(variantsData) || variantsData.length === 0)
      return res
        .status(400)
        .send({ message: "Minimum 1 variants is required" });

    for (const variant of variantsData) {
      if (!variant.sku)
        return res.status(400).send({ message: "SKU is required" });
      if (!variant.color)
        return res.status(400).send({ message: "color is required" });
      if (!variant.size)
        return res.status(400).send({ message: "size is required" });
      if (!variant.stock || variant.stock < 1)
        return res
          .status(400)
          .send({ message: "stock is required and must be more than o" });
    }

    const skus = variantsData.map((v) => v.sku);
    if (new Set(sku).size !== skus.length)
      return res.status(400).send({ message: "Sku must be unique" });

    //image validation and upload
    const thumbnailUrl = await uploadToCloudinary({
      mimetype: thumbnail[0].mimetype,
      imgBuffer: thumbnail[0].mimetype,
    });

    const imageRes = images.map((item) => {
      return uploadToCloudinary({
        mimetype: item.mimetype,
        imgBuffer: item.imgBuffer,
      });
    });
    const imageUrls = await Promise.all(imageRes);

    const productData = await productSchema.create({
      title,
      slug,
      description,
      category,
      price,
      discountPersentage,
      variants: variantsData,
      tags,
      isActive,
      thumbnail: thumbnailUrl,
      images: imageUrls,
    });

    res
      .status(400)
      .send({ message: "Product Created Successfull", productData });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Inernal Server Error" });
  }
};

module.exports = { createProduct };
