require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnect = require("./utility/db_connection");
const authRouter = require("./Routes/AuthRouter");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/UserRouter");
const productRouter = require("./Routes/ProductRouter");
const cors = require("cors");
const paymentRouter = require("./Routes/routes-payments");
const adminRouter = require("./Routes/routes-admin");
const PORT = process.env.PORT;
const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.nobbo.zxpjwvt.mongodb.net", console.log);
console.log(dns.getServers());

databaseConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://nobbo.vercel.app",
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
