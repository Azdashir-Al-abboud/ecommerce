const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// nodemailer needs a transport service using which it can send emails. In this example, I am using Gmail.
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "azdashir.it.0.1@gmail.com",
    pass: "xwlf xlxl ftkq osfj",
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

const sendVerificationEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount();
  // const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({
    from: "azdashir.it.0.1@gmail.com", // sender address
    to,
    subject,
    html,
  });
};

route.post("/text-mail", (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "azdashirsupport@gmail.com",
    to: to,
    subject: subject,
    // text: text,
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log("=========");
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

route.post("/attachments-mail", (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "youremail@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
    attachments: [
      {
        // file on disk as an attachment
        filename: "nodemailer.png",
        path: "nodemailer.png",
      },
      {
        // file on disk as an attachment
        filename: "text_file.txt",
        path: "text_file.txt",
      },
    ],
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

module.exports = sendVerificationEmail;
