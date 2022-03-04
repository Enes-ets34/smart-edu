const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1> Hello Dunyali</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ÏSunucu ${PORT} uzerinde calisiyor...`);
});
