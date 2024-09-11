const express = require("express");
const cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const authRoute = require("./routes/auth");
const forgetPasswordRoute = require("./routes/forgetpassword");
const categories = require("./routes/category");
const home = require("./routes/home");
const items = require("./routes/items");

const app = express();

const multer = require("multer"); // =======
const upload = multer(); // =====

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
// app.use(express.static('public'));

// app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/static', express.static('upload'));
app.use("/auth", authRoute);
app.use("/forgetpassword", forgetPasswordRoute);
app.use("/categories", categories);
app.use("/home", home);
app.use("/items", items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running....${PORT}`);
});

module.exports = app;