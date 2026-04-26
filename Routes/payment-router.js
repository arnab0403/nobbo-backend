const express = require("express");
const paymentRouter = express.Router();

const {
  createOrder,
  updateUsersCurrentOrder,
} = require("../Controller/payment-controller");
const { authMiddleware } = require("../Controller/auth-controller");

paymentRouter.post("/create-order", createOrder);
paymentRouter.post(
  "/update-user-orders",
  authMiddleware,
  updateUsersCurrentOrder,
);

module.exports = paymentRouter;
