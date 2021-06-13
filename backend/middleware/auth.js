const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function authenticateJWT(req, res, next) {
    try {
        const payload = jwt.verify(req.body._token, SECRET_KEY);
        req.user = payload;
        return next();
    } catch (e) {
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        return next({status: 401, message: "Unauthorized"});
    } else {
        return next();
    }
}

function ensureCorrectUser(req, res, next) {
    console.log(req.user.username)
    console.log(req.params.username)
    try {
        if (req.user.username === req.params.username) {
            return next();
        } else {
            return next({status: 401, message: "Unauthorized"});   
        }
    }
    catch (err) {
        return next({status: 401, message: "Unauthorized"});
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureCorrectUser
};