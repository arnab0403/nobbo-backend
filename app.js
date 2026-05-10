require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnect = require("./utility/db_connection");
const authRouter = require("./Routes/auth-router");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/user-router");
const productRouter = require("./Routes/product-router");
const cors = require("cors");
const paymentRouter = require("./Routes/payment-router");
const adminRouter = require("./Routes/admin-router");
const oauthRouter = require("./Routes/oauth-router");
const passport = require("./utility/passport-config");
const session = require("express-session");
const PORT = process.env.PORT;

databaseConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://www.nobbo.in", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SECRECT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/test", (req, res) => {
  res.send("Test Hit");
});
app.use("/api/auth/", authRouter);
app.use("/api/oauth/", oauthRouter);
app.use("/api/user/", userRouter);
app.use("/api/product/", productRouter);
app.use("/api/payment/", paymentRouter);
app.use("/api/admin/", adminRouter);

app.listen(PORT, () => {
  console.log("Server started at PORT: ", PORT);
});

