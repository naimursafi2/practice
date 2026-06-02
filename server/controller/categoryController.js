const { uploadToCloudinary, destroyFromCloudinary } = require("../helpers/utils");
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

const updateCategory = async (req, res) => {
 // const { id } = req.params;
  const { title } = req.body;
  const thumbnail = req.file;

  try {
    const category = await categorySchema.findOne({ _id: req.user._id });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    if (title && title.trim()) {
      category.title = title;
    }

    if (thumbnail) {
      try {
        const thumbnailUrl = await uploadToCloudinary({
          mimetype: thumbnail.mimetype,
          imgBuffer: thumbnail.buffer,
        });

        if (category.thumbnail) {
          await destroyFromCloudinary(category.thumbnail);
        }

        category.thumbnail = thumbnailUrl;
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          message: "Thumbnail upload failed",
        });
      }
    }

    await category.save();

    res.status(200).send({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = { createCategory, getAllCategory, updateCategory };
