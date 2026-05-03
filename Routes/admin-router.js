const express = require("express");
const {
  getAllOrders,
  updateOrder,
  adminLogin,
  adminLogout,
  adminAuthMiddleware,
  getAllUsers,
} = require("../Controller/admin-controller");

const adminRouter = express.Router();

adminRouter.get("/track-orders", adminAuthMiddleware, getAllOrders);
adminRouter.put("/update-order", adminAuthMiddleware, updateOrder);
adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/admin-logout", adminLogout);
adminRouter.get("/users", adminAuthMiddleware, getAllUsers);

module.exports = adminRouter;
