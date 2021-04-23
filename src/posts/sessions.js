var express = require("express");
var request = require("request");
var path = require("path");
var fs = require("fs");

var router = express.Router();
const getLatestTime = () => {
  try {
    const data = fs.readFileSync("/Users/joe/test.txt", "utf8");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

let latestTime = parseInt(getLatestTime(), 10);

router.route("/time").get((req, res, next) => {
  res.send("LATEST TIME:" + latestTime);
});
router
  .route("/")
  .get(async function (req, res, next) {
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

            data = [...data, ...results.data];
            data = data.filter((d) => d.finished_at >= latestTime);
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
                  data = [...data, ...results.data];
                  data = data.filter((d) => d.finished_at >= latestTime);
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
                        data = [...data, ...results.data];
                        data = data.filter((d) => d.finished_at >= latestTime);
                        data = data.sort(
                          (a, b) => a.finished_at > b.finished_at
                        );
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
  })
  .post((req, res, next) => {
    latestTime = req.body.latestTime;
    fs.writeFile(path.join(__dirname, "/latest"), latestTime, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      res.end("success");
    });
  });

module.exports = router;
