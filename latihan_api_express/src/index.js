const express = require("express");
const app = express();
const port = 3000;

const postRoutes = require("./routes/postRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Server sedang berjalan cuy");
});

app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
