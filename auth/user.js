const express = require("express");
const { query } = require("../connection");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

router.post("/signup", (req, res) => {
    const user = req.body;
    let query = "select * from users where users_email=? or users_phone=?";
  
    connection.query(query, [user.email,user.phone], (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          query =
            "insert into users(users_name,users_password,users_email,users_phone,users_verify) values(?,?,?,?,'0')";
            console.log(user);
          connection.query(
            query,
            [user.username,user.password,user.email,user.phone],
            (err, results) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "Successfully Registered" });
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } else {
          return res.status(400).json({status:"failur", message: "Email or Phone Already Exist." });
        }
      } else {
        return res.status(500).json(err);
      }
    });
  });


  
router.get("/get", (req, res) => {
  var query =
    "select * from users";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});



  module.exports = router;
