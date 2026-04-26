require("dotenv").config();
require("../Model/user-model");

const OrderModel = require("../Model/order-model");
const UserModel = require("../Model/user-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/mail/mail");

const SECRECT_KEY = process.env.SECRECT_KEY;

/**
 * Admin authentication middleware
 */
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const cookie = req.cookies["jwt"];
    const paylod = jwt.verify(cookie, SECRECT_KEY);
    const id = paylod?.id;

    if (!id) {
      res.clearCookie("jwt");
      return res.status(400).json({
        message: "Invalid JWT",
        status: "failed",
      });
    }

    const isAdmin = await UserModel.findOne({ _id: id, role: "admin" });

    if (!isAdmin) {
      res.clearCookie("jwt");
      return res.status(403).json({
        message: "Access denied",
        status: "failed",
      });
    }

    req.userId = id;
    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: err.message,
    });
  }
};

/**
 * Get all orders controller
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("user", "name email");

    res.status(200).json({
      status: "success",
      message: "All orders fetched",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

/**
 * Update order controller
 */
const updateOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const { trackingId } = req.body;
    console.log(id, trackingId);
    const order = await OrderModel.findOne({ orderId: id });
    order.trackingId = trackingId;
    await order.save();

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

/**
 * Login controller
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        status: "failed",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        status: "failed",
      });
    }

    const smallCaseEmail = email.toLowerCase().trim();

    const user = await UserModel.findOne({ email: smallCaseEmail });

    if (!user) {
      return res.status(404).json({
        message: "Wrong email ID and password",
        status: "failed",
      });
    }

    const hashedPassword = user.password;
    const isVerified = await bcrypt.compare(password, hashedPassword);

    if (!isVerified) {
      return res.status(404).json({
        message: "Wrong email ID and password",
        status: "failed",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
        status: "failed",
      });
    }

    const userId = user._id;

    const jwtToken = jwt.sign({ id: userId }, SECRECT_KEY, { expiresIn: "1d" });
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    res.status(200).json({
      message: "User logged in",
      status: "success",
      user: user,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * Logout controller
 */
const adminLogout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      message: "Cookie removed successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: err.message,
    });
  }
};

module.exports = {
  getAllOrders,
  updateOrder,
  adminLogout,
  adminLogin,
  adminAuthMiddleware,
};
