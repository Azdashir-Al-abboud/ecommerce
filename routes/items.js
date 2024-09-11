const express = require("express");
const pool = require("../connection");
const router = express.Router();
require("dotenv").config();


router.get('/getitems/:id', function (req, res) {
    const id = req.params.id;
    var query = "select * from items_view where categories_id=?";
    pool.query(query,[id], (err, results) => {
      if (!err) {
        console.log("yeeeeeeeeees");
          return res.status(200).json({ status: "success", data: results });
      } else {
        console.log("nooooooooooooooooooooo");
        return res.status(500).json({ status: "failure" }, err);
      }
    });
});






module.exports = router;
