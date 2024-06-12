const express = require("express");
const pool = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/getall", (req, res) => {
  let user = req.body;
  let allData = [];
  var query = "select * from categories";
  pool.query(query, (err, results) => {
    if (!err) {
      // allData["status"] = "success";
      // allData["categories"] = results;
      // console.log(allData);
      return res.status(200).send({status:"success","categories":results});
    } else {
      return res.status(500).json({ status: "failure" }, err);
    }
  });
});

module.exports = router;