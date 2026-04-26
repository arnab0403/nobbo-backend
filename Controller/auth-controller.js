require("dotenv").config();
const UserModel = require("../Model/user-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/mail/mail");

const SECRECT_KEY = process.env.SECRECT_KEY;

/**
 * Sign up controller
 */

const signup = async (req, res) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(400).json({
        message: "Please provide the data before sign up",
        status: "failed",
      });
    }

    if (!user.name) {
      return res.status(400).json({
        message: "Please give your name before sign up",
        status: "failed",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please give password before sign up",
        status: "failed",
      });
    }

    if (!user.email) {
      return res.status(400).json({
        message: "Please give email before sign up",
        status: "failed",
      });
    }
    if (!user.email.includes("@gmail")) {
      return res.status(400).json({
        message: "Please give a valid email before sign up",
        status: "failed",
      });
    }
    const email = user.email;

    const ifExist = await UserModel.findOne({ email });

    if (ifExist) {
      return res.status(400).json({
        message: "User already exist",
        status: "failed",
      });
    }

    const password = user.password;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    user.password = hashedPass;

    const userResponse = await UserModel.create(user);

    const userId = userResponse._id;

    const jwtToken = jwt.sign({ id: userId }, SECRECT_KEY, { expiresIn: "7d" });
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    userResponse.password = undefined;
    userResponse.createdAt = undefined;
    userResponse.updatedAt = undefined;

    return res.status(200).json({
      message: "User created successfully",
      status: "success",
      user: userResponse,
    });
  } catch (err) {
    console.log("Error in Sign up", err);
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
      error: err.message,
    });
  }
};

/**
 * Login controller
 */
const login = async (req, res) => {
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

    const userId = user._id;

    const jwtToken = jwt.sign({ id: userId }, SECRECT_KEY, { expiresIn: "7d" });
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
const logout = (req, res) => {
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

/**
 * Reset Password Controller
 */
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email ID not found",
        status: "failed",
      });
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry (5 minutes)
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    await sendMail("", "resetPasswordOtp", "", user.email, otp);

    console.log(otp);
    // save to db
    user.otp = {
      code: otp,
      expiresAt: expiry,
    };

    await user.save();

    // response (later you send email instead)
    return res.status(200).json({
      message: "OTP generated successfully",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      status: "failed",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // 2️⃣ check otp exists
    if (!user.otp || !user.otp.code) {
      return res.status(400).json({
        status: "failed",
        message: "No OTP requested",
      });
    }

    // 3️⃣ check expiry
    if (user.otp.expiresAt < new Date()) {
      return res.status(400).json({
        status: "failed",
        message: "OTP expired",
      });
    }

    // 4️⃣ check otp match
    if (user.otp.code !== otp) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid OTP",
      });
    }

    // 5️⃣ success (optional: clear otp)
    user.otp = undefined;
    user.otp.verified = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "OTP verified",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // 2️⃣ ensure OTP verified
    if (!user.otp || user.otp.verified !== true) {
      return res.status(403).json({
        status: "failed",
        message: "OTP not verified",
      });
    }

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ update password
    user.password = hashedPassword;

    // 5️⃣ clear otp data
    user.otp = undefined;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const cookie = req.cookies.jwt;
    const paylod = jwt.verify(cookie, SECRECT_KEY);
    const id = paylod?.id;

    if (!id) {
      res.clearCookie("jwt");
      return res.status(400).json({
        message: "Invalid JWT",
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
module.exports = {
  signup,
  login,
  logout,
  authMiddleware,
  resetPassword,
  verifyOTP,
  changePassword,
};
