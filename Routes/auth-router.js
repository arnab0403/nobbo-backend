const express = require("express");
const {
  signup,
  login,
  logout,
  authMiddleware,
  resetPassword,
  verifyOTP,
  changePassword,
} = require("../Controller/auth-controller");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/auth", authMiddleware);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/change-password", changePassword);

module.exports = authRouter;
