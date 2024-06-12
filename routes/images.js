const express = require("express");
const fs = require("fs");
const router = express.Router();
require("dotenv").config();

router.get("/categoriesimage", (req, res) => {
  const filePath = "../upload/items/camera.PNG";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }
    res.writeHead(200, { "Content-Type": "image/svg" });
    res.end(data);
  });
});


module.exports = router;