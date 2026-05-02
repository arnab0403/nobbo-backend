const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const UserModel = require("../Model/user-model");
const jwt = require("jsonwebtoken");

const SECRECT_KEY = process.env.SECRECT_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ email: profile.email });

        if (user && user.authProvider !== "google") {
          return done(null, false, {
            message: "Email already registered with a different provider",
          });
        }

        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            email: profile.email,
            password: "",
            googleId: profile.id,
            authProvider: "google",
          });
        }

        const jwtToken = jwt.sign({ id: user._id }, SECRECT_KEY, {
          expiresIn: "7d",
        });

        return done(null, { user, token: jwtToken });
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});

module.exports = passport;
