const express = require("express");
const app = express();
const cors = require("cors");
const { NotFoundError } = require("./expressError");

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

module.exports = app;