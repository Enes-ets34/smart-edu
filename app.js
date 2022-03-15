const express = require("express");
const mongoose = require("mongoose");

const fileUpload = require("express-fileupload");
const app = express();
const ejs = require("ejs");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");

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
app.use(fileUpload());

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} uzerinde calisiyor...`);
});
