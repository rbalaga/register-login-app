var express = require("express");
var axios = require("axios");

var router = express.Router();
router.route("/").get(async function (req, res, next) {
  const response = axios.get("http://dev.codementor.io/api/sessions", {
    headers: {
      "x-codementor-api-key": "14f9ffcb7d4ed7efec12"
    }
  });
  console.log("response: " + JSON.stringify(response));
  const data = response.data;

  res.json(data);
});

module.exports = router;
