const express = require("express");
const cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const userAuth = require("./auth/user");
const userverifycode = require("./auth/verifycode");

const app = express();

const multer = require('multer'); // =======
const upload = multer(); // =====

app.use(express.static('public'))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


app.use("/user", userAuth);
app.use("/verify", userverifycode);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
// module.exports = app;