require("dotenv").config();
const mongoose = require("mongoose");

const DB_PASSWORD = process.env.DB_PASSWORD;
console.log("DB_PASSWORD: ", DB_PASSWORD);
const DBURL = `mongodb+srv://Nobbo:${DB_PASSWORD}@nobbo.zxpjwvt.mongodb.net/?appName=Nobbo`;

function databaseConnect() {
  mongoose
    .connect(DBURL)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log("Database Connection Failed: ", err);
    });
}

module.exports = databaseConnect;
