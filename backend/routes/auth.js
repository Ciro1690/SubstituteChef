const express = require("express");
const ExpressError = require("../expressError");
const { createToken } = require("../helpers/tokens");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({user, token});
    }
    catch (e) {
        return next(e);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError("Username and password required", 400);
        }
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({token});
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;