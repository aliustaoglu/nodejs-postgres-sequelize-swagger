var express = require("express");
var router = express.Router();
var db = require("../lib/database");

/* GET users listing. */
router.get("/all", function (req, res, next) {
  db.Customer.findAll()
    .then((customers) => {
      res.status(200).send(JSON.stringify(customers));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;
