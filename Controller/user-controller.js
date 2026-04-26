const UserModel = require("../Model/user-model");
const ShortId = require("short-unique-id");
const OrderModel = require("../Model/order-model");
const { sendMail } = require("../utility/mail/mail");

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    res.status(200).json({
      message: "User details",
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: err.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = req.body;

    const uid = new ShortId({ length: 10 });
    cart.id = uid.rnd();

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
      });
    }

    const newCart = user.cart;
    newCart.push(cart);
    user.cart = newCart;

    await user.save();

    res.status(202).json({
      message: "Item added to cart",
      status: "success",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json({
        message: "Authentication error",
        status: "failed",
      });
    }

    const user = await UserModel.findById(userId);

    const cart = user.cart;

    res.status(202).json({
      message: "Item added to cart",
      status: "success",
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json({
        message: "Authentication error",
        status: "failed",
      });
    }

    const orders = await OrderModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Orders fetched successfully",
      status: "success",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

const calculateOrderSummary = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json({
        message: "Authentication error",
        status: "failed",
      });
    }

    const user = await UserModel.findById(userId);

    const cart = user.cart;

    const amount = cart.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

    const shippingCharges = 0;

    let totalAmount = amount;
    if (amount < 1000) {
      totalAmount = amount + 100;
    }
    const data = {
      amount: amount,
      shippingCharges: shippingCharges,
      totalAmount: totalAmount,
    };

    res.status(202).json({
      message: "Order Summary",
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json({
        message: "Authentication error",
        status: "failed",
      });
    }

    const user = await UserModel.findById(userId);

    const addressData = req.body;

    if (addressData?.phone.length < 10 || addressData?.phone.length > 10) {
      return res.status(400).json({
        message: "Phone number must be 10 digits",
        status: "failed",
      });
    }

    if (!addressData?.city) {
      return res.status(400).json({
        message: "City is required",
        status: "failed",
      });
    }

    if (!addressData?.state) {
      return res.status(400).json({
        message: "State is required",
        status: "failed",
      });
    }

    if (addressData.pincode.length < 6 || addressData.pincode.length > 6) {
      return res.status(400).json({
        message: "Pincode must be 6 digits",
        status: "failed",
      });
    }

    user.address = {
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      address: addressData.address,
    };

    const phone = addressData.phone;
    user.phone = phone;

    await user.save();

    user.password = undefined;

    res.status(202).json({
      message: "Address added successfully",
      status: "success",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // remove item
    const newCart = user.cart.filter((item) => item.id !== productId);

    user.cart = newCart;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Item removed from cart",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { name, phone, email, address } = req.body;

    if (!email.includes("@gmail")) {
      return res.status(500).json({
        status: "failed",
        message: "Please provide a valid email",
      });
    }

    // Build dynamic update object
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;

    // Nested object handling
    if (address) {
      if (address.city) updateData["address.city"] = address.city;
      if (address.state) updateData["address.state"] = address.state;
      if (address.pincode) updateData["address.pincode"] = address.pincode;
      if (address.street) updateData["address.street"] = address.street;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    updatedUser.password = undefined;
    updatedUser.createdAt = undefined;
    updatedUser.otp = undefined;

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const userHelp = async (req, res) => {
  try {
    const { email, message } = req.body;
    await sendMail("", "help", "", email);
    await sendMail("", "adminMail", "", email, "", message);

    res.status(200).json({
      status: "success",
      message: "Email send to user",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getUserDetails,
  addToCart,
  getUserCart,
  calculateOrderSummary,
  getUserOrders,
  removeItemFromCart,
  addAddress,
  updateUser,
  userHelp,
};
