const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");
const { NotFoundError } = require("./expressError");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/companies", companyRoutes);
app.use("/jobs", jobRoutes);

app.use(function(req, res, next) {
    return next(new NotFoundError());
});

app.use(function (error, req, res, next) {
    let status = error.status || 500;
    let message = error.message
    return res.status(status).json({
        error: {message, status},
    });
});

module.exports = app;