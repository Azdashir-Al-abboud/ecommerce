const express = require("express");
const pool = require("../connection");
var async      = require('async');
const router = express.Router();
require("dotenv").config();


router.get('/getall', function (req, res) {
    var query1 = "select * from categories";
    var query2 = "select * from items_view where items_discount!=0";

    var return_data = {};

    async.parallel([
       function(parallel_done) {
           pool.query(query1, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.categories = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query2, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.items = results;
               parallel_done();
           });
       }
    ], function(err) {
         if (err) console.log(err);
        //  pool.end();
         res.json({status:"success",return_data});
    });
});






module.exports = router;



//==========================
// router.get("/getall", (req, res) => {
//   let user = req.body;
//   let allData = [];
//   var query = "select * from categories";
//   pool.query(query, (err, results) => {
//     if (!err) {
//       // allData["status"] = "success";
//       // allData["categories"] = results;
//       // console.log(allData);
//       return res.status(200).send({status:"success","categories":results});
//     } else {
//       return res.status(500).json({ status: "failure" }, err);
//     }
//   });
// });
//==========================