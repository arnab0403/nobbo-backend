const express = require("express");
const paymentRouter = express.Router();

const { createOrder, updateUsersCurrentOrder } = require("../Controller/PaymentController");
const { authMiddleware } = require("../Controller/AuthController");

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/update-user-orders",authMiddleware, updateUsersCurrentOrder);


module.exports = paymentRouter;