const UserModel = require("../Model/user-model");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const SECRECT_KEY = process.env.SECRECT_KEY;

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleAuthCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: process.env.FRONTEND_URL + "/login?error=google-no-data",
    },
    (err, data) => {
      if (err) {
        return next(err);
      }

      if (!data) {
        return res.redirect(process.env.FRONTEND_URL + "/login?error=google");
      }

      res.cookie("jwt", data.token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.redirect(process.env.FRONTEND_URL + "/");
    },
  )(req, res, next);
};

const getProfile = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;

    if (!cookie) {
      return res.status(401).json({
        status: "failed",
        message: "Not authenticated",
      });
    }

    const payload = jwt.verify(cookie, SECRECT_KEY);
    const user = await UserModel.findById(payload.id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    user.password = undefined;
    user.otp = undefined;

    res.status(200).json({
      status: "success",
      message: "User profile retrieved",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  googleAuth,
  googleAuthCallback,
  getProfile,
  logout,
};
