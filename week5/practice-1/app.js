const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const resaurantRoutes = require("./routes/restaurants");

const app = express();
exports.app = app;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", resaurantRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
