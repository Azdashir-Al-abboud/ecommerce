const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const userAuth = require("./auth/user");

const app = express();

const multer = require('multer'); // =======
const upload = multer(); // =====


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ==========
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
// ===========
app.use("/user", userAuth);


module.exports = app;