const express = require("express");
const {getAllOrders,updateOrder} = require("../Controller/controller-admin");

const adminRouter = express.Router();

adminRouter.get("/track-orders",getAllOrders);
adminRouter.put("/update-order",updateOrder);

module.exports=adminRouter;