const express = require("express");
const {
  getUserDetails,
  addToCart,
  getUserCart,
  calculateOrderSummary,
  getUserOrders,
  addAddress,
  removeItemFromCart,
  updateUser,
  userHelp,
} = require("../Controller/UserController");
const { authMiddleware } = require("../Controller/AuthController");
const { getCurrentProducts } = require("../Controller/ProductController");

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUserDetails);
userRouter.post("/add-to-cart", authMiddleware, addToCart);
userRouter.get("/cart", authMiddleware, getUserCart);
userRouter.get("/order-summary", authMiddleware, calculateOrderSummary);
userRouter.get("/orders", authMiddleware, getUserOrders);
userRouter.get("/products", getCurrentProducts);
userRouter.put("/add-address", authMiddleware, addAddress);
userRouter.delete("/cart/:productId", authMiddleware, removeItemFromCart);
userRouter.put("/update-user", authMiddleware, updateUser);
userRouter.post("/help",userHelp);

module.exports = userRouter;
