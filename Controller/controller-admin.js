const OrderModel = require("../Model/OrderModel");
require("../Model/UserModel");

const getAllOrders = async (req, res) => {
  try {

    const orders = await OrderModel.find().populate("user","name email");


    res.status(200).json({
      status: "success",
      message: "All orders fetched",
      orders: orders
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const { trackingId } = req.body;
    console.log(id,trackingId);
    const order = await OrderModel.findOne({orderId:id});
    order.trackingId = trackingId;
    await order.save();

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      order: order
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

module.exports={getAllOrders,updateOrder};