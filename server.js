require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
//import { APP_PORT, DB_URL } from "./config/index";
const app = express();
const routes = require("./routes");
// console.log(APP_PORT);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => console.log(`Server is Running at ${process.env.PORT}.`));
