const express = require("express");
const pool = require("../connection");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("../functions/sendemail");
const router = express.Router();

require("dotenv").config();

router.post("/checkemail", (req, res) => {
  const user = req.body;
  let query = "select * from users where users_email=?";
  pool.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const verifyCode = Math.floor(10000 + Math.random() * 90000);
        query = "update users set users_verifycode=? where users_email=?";
        pool.query(query, [verifyCode, user.email], async (err, results) => {
          if (!err) {
            await sendVerificationEmail({
              to: user.email,
              subject: "Verify Code Ecommerce",
              html: `<b>Hey there! </b><br> Your Verify Code: ${verifyCode}<br/>`,
            });
            return res
              .status(200)
              .json({ status: "success", message: "Verified successfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(400).json({
          status: "failur",
          message: "Incorrecrt User Name",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/verifycode", (req, res) => {
  const user = req.body;
  let query = "select * from users where users_email=? and users_verifycode=?";
  pool.query(query, [user.email, user.verifycode], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        return res
          .status(200)
          .json({ status: "success", message: "Verified successfully" });
      } else {
        return res.status(400).json({
          status: "failur",
          message: "VerifyCode not correct",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/resetpassword", (req, res) => {
  const user = req.body;
  let query = "update users set users_password=? where users_email=?";
  pool.query(query, [user.password, user.email], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "User Email does not exist" }); // 404 Not Found
      }
      return res
        .status(200)
        .json({ status: "success", message: "User Updated Successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
