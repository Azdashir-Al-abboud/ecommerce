const express = require("express");
const pool = require("../connection");
const router = express.Router();

require("dotenv").config();

router.get("/getall", (req, res) => {
    let user = req.body;
    var query = "select * from categories";
    pool.query(query, (err, results) => {
      if (!err) {
          return res.status(200).json({ status: "success", data: results });
      } else {
        return res.status(500).json({ status: "failure" }, err);
      }
    });
  });

  module.exports=router