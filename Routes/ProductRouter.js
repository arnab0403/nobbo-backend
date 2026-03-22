const express = require("express");
const {
  addProduct,
  getHoodies,
  getDesignedPunjabis,
  getFullSleveTshirts,
  getTShirts,
  getHoodiesByID,
  getCurrentProducts,
  getOversizedTshirts,
  getProductsByName,
} = require("../Controller/ProductController");

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/hoodies", getHoodies);
productRouter.get("/hoodies/:id", getHoodiesByID);
productRouter.get("/punjabi", getDesignedPunjabis);
productRouter.get("/fullsleveTshirt", getFullSleveTshirts);
productRouter.get("/tshirt", getTShirts);
productRouter.get("/oversized", getOversizedTshirts);
productRouter.get("/current-products", getCurrentProducts);
productRouter.get("/search", getProductsByName);

module.exports = productRouter;
