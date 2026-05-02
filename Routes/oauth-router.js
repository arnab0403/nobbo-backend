const express = require("express");
const {
  googleAuth,
  googleAuthCallback,
  getProfile,
  logout,
} = require("../Controller/oauth-controller");

const oauthRouter = express.Router();

oauthRouter.get("/google", googleAuth);
oauthRouter.get("/google/callback", googleAuthCallback);
oauthRouter.get("/profile", getProfile);
oauthRouter.post("/logout", logout);

module.exports = oauthRouter;
