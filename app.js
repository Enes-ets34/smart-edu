const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");


const app = express();
//DB Connect
mongoose
  .connect("mongodb://localhost/smartedu-db", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("----DB CONNECTED----");
  });

//Template Engines
app.set("view engine", "ejs");

//Global Variables
global.userIN = null;

//Middlewares

app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use(
  session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} uzerinde calisiyor...`);
});
