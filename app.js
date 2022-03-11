const express = require("express");
const mongoose = require("mongoose");

const app = express();
const ejs = require("ejs");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

//DB Connect
mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log("***DB CONNECTED***");
});

//Template Engines
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} uzerinde calisiyor...`);
});
