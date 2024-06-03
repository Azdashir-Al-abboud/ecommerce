const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

router.post("/verifycode", (req, res) => {
  const user = req.body;
  let query = "select * from users where users_email=? and users_verifycode=?";
  connection.query(
    query,
    [user.email, user.verifyCode],
    async (err, results) => {
      if (!err) {
        if (results.length > 0) {
          query = "update users set users_approve='1' where users_email=?";
          connection.query(query, [user.email], (err, results) => {
            if (!err) {
              return res.status(200).json({ message: "Success" });
            } else {
              return res.status(500).json(err);
            }
          });
        } else {
          return res.status(400).json({
            status: "failur",
            message: "VerifyCode not correct",
          });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

module.exports = router;
