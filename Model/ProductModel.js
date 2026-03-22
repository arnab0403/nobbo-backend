const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  size: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL"],
    default: ["S", "M", "L", "XL", "XXL"],
  },
  color: {
    type: String,
    enum: ["black", "white", "blue", "maroon"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [
    {
      type: String, // store URL or image path
    },
  ],
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "tshirt",
        "over-sized-tshirt",
        "fullSleeveTshirt",
        "hoodie",
        "punjabi",
      ],
    },
    variants: [variantSchema], // all sizes/colors under one product
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
