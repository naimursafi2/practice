const mongoose = require("mongoose");

const variants = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      reference: "category",
      required: true,
    },
    price: {
      type: Number,
      requird: true,
    },
    discountPersentage: {
      type: Number,
      default: 0,
    },
    variants: [variants],
    tags: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      dafault: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
