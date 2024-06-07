const express = require("express");
const { query } = require("../connection");
const pool = require("../connection");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("../functions/sendemail");
const router = express.Router();

require("dotenv").config();

router.post("/signup", (req, res) => {
  const user = req.body;
  const verifyCode = Math.floor(Math.random() * 100000);
  let query = "select * from users where users_email=? or users_phone=?";

  pool.query(query, [user.email, user.phone], async (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query =
          "insert into users(users_name,users_password,users_email,users_phone,users_verifycode) values(?,?,?,?,?)";
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        pool.query(
          query,
          [user.username, hash, user.email, user.phone, verifyCode],
         async (err, results) => {
            if (!err) {
             await sendVerificationEmail({
                to: user.email,
                subject: "Verify Code Ecommerce",
                html: `<b>Hey there! </b><br> Your Verify Code: ${verifyCode}<br/>`,
              });
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ status: "failur", message: "Email or Phone Already Exist." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/testget", (req, res) => {
  let user = req.body;
  var query = "select * from users where users_email=azdashiraboud@gmail.com";
  pool.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({"status": "success","data":results });
    } else {
      return res.status(500).json({"status": "failure"},err);
    }
  });
});

module.exports = router;
