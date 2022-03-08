const express = require("express");

const ejs = require("ejs");
const app = express();

//Template Engines
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
});
app.get("/pricing", (req, res) => {
  res.status(200).render("pricing", {
    page_name: "pricing",
  });
});
app.get("/teachers", (req, res) => {
  res.status(200).render("teachers", {
    page_name: "teachers",
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} uzerinde calisiyor...`);
});
