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
const PORT = process.env.PORT;

databaseConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://nobbo.in", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use("/test", (req, res) => {
  res.send("Test Hit");
});
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/product/", productRouter);
app.use("/api/payment/", paymentRouter);
app.use("/api/admin/", adminRouter);

app.get("/", (req, res) => {
  res.send("Server started");
});

app.listen(PORT, () => {
  console.log("Server started at PORT: ", PORT);
});
