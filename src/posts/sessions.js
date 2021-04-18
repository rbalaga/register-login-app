var express = require("express");
var request = require("request");

var router = express.Router();
router.route("/").get(async function (req, res, next) {
  try {
    let data = [];
    const response = request(
      {
        url: "https://dev.codementor.io/api/sessions",
        headers: {
          "x-codementor-api-key": "14f9ffcb7d4ed7efec12"
        }
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const results = JSON.parse(body);
          data = [...data, ...results];
          request(
            {
              url: "https://dev.codementor.io/api/direct-payments",
              headers: {
                "x-codementor-api-key": "14f9ffcb7d4ed7efec12"
              }
            },
            (error, response, body) => {
              if (!error && response.statusCode === 200) {
                const results = JSON.parse(body);
                data = [...data, ...results];
                request(
                  {
                    url: "https://dev.codementor.io/api/freelance-jobs",
                    headers: {
                      "x-codementor-api-key": "14f9ffcb7d4ed7efec12"
                    }
                  },
                  (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                      const results = JSON.parse(body);
                      data = [...data, ...results];
                      res.json(data);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("failed: " + error.message);
    res.end("failed: " + error.message);
  }
});

module.exports = router;