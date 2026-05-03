const mongoose = require("mongoose");

const user = {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    sparse: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length === 10 && /^\d+$/.test(value);
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  address: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orders: [],
  cart: [],
  authProvider: {
    type: String,
    enum: ["nobbo", "google"],
    default: "nobbo",
  },
  otp: {
    code: String,
    expiresAt: Date,
    verified: Boolean,
  },
  lastActive: {
    type: Date,
  },
};

const userSchema = new mongoose.Schema(user, { timestamps: true });

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
