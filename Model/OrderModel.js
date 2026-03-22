const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  orderId:{
    type:String,
    required:true
  },
  razorPayOrderId:{
    type:String,
    required:true
  },
  products:[{}],
  totalAmount:{
    type:Number,
    required:true
  },
  paymentId:{
    type:String,
    required:true
  },
  trackingId:{
    type:String,
  }

}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;