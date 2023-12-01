const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ user: "users" });
});

app.get("/sendemail", async (req, res) => {

  let testAccount = await nodemailer.createTestAccount();

  // connect with smtp server
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mackenzie.schmitt76@ethereal.email",
      pass: "u4bfAN6vYxPvhrggz3",
    },
  });

  let info = await transporter.sendMail({
    from: '"Muhammad Nauman" <Nauman@gmail.com>', // sender address
    to: "nkbangash03@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  res.json(info);

});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
