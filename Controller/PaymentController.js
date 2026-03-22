const dotenv = require("dotenv");
// Razorpay Dependencies
const Razorpay = require("razorpay");
const ShortId = require("short-unique-id");
const UserModel = require("../Model/UserModel");
const OrderModel = require("../Model/OrderModel");
const { sendMail } = require("../utility/mail/mail");

dotenv.config();

const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY } = process.env;

const instance = new Razorpay({
  key_id: RAZORPAY_PUBLIC_KEY,
  key_secret: RAZORPAY_PRIVATE_KEY,
});

async function createOrder(req, res) {
  console.log("hit");
  try {
    const amount = req.body.amount;
    const currency = "INR";
    const uid = new ShortId({ length: 10 });
    const orderConfig = {
      amount: amount * 100,
      currency: currency,
      receipt: uid.rnd(),
    };

    const order = await instance.orders.create(orderConfig);

    res.status(202).json({
      message: "Checkout created",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
    });
  }
}

async function updateUsersCurrentOrder(req, res) {
  try {
    const { amount, razorPayOrderId, paymentId } = req.body;
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
      });
    }

    const cart = user.cart;
    const orderId = "nobbo-" + new ShortId({ length: 10 }).rnd();
    const order = await OrderModel.create({
      orderId: orderId,
      razorPayOrderId: razorPayOrderId,
      products: cart,
      totalAmount: amount,
      paymentId: paymentId,
      user: user["_id"],
    });

    user.cart = [];
    await user.save();
    await sendMail(orderId, "orderConfirmed", amount, user.email);

    res.status(200).json({
      message: "User orders updated",
      status: "success",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
    });
  }
}

module.exports = { createOrder, updateUsersCurrentOrder };
