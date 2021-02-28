const express = require("express");
const { validaiteAuthToken } = require("../auth/login");
const { users } = require("./../db/users.json");

const router = express.Router();

router.route("/").get(validaiteAuthToken, (req, res, next) => {
  res.jsonp({ status: "Signin successfull", users: users });
});

router.route("/users").get((req, res, next) => {
  res.jsonp(users);
});

module.exports = router;
