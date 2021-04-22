// server.js
require("dotenv").config();

var fs = require("fs");
var request_create = "";
fs.readFile("request_creation_mail.html", function(err, data) {
  console.log({ fs_data: data });
  request_create = data;
  console.log({ request_create });
});
var request_update = "";
fs.readFile("request_update_mail.html", function(err, data) {
  console.log({ fs_data: data });
  request_update = data;
  console.log({ request_update });
});

var express = require("express");
var fallback = require("express-history-api-fallback");
const root = `${__dirname}/dist`;

// var path = require("path");
// var serveStatic = require("serve-static");
var cors = require("cors");

const nodemailer = require("nodemailer");
const mail_config = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOTIFICATION_EMAIL,
    pass: process.env.NOTIFICATION_EMAIL_PASSWORD
  }
};
console.log({ mail_config });
const transporter = nodemailer.createTransport(mail_config);

const sendEmail = ({ to, subject, data }) => {
  console.log({ request_create: request_create });
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.NOTIFICATION_EMAIL,
        to: to,
        subject: subject,
        html:
          data.create === true
            ? request_create
                .toString()
                .replace("__url__", `<a href="${data.url}">${data.url}</a>`)
            : request_update.toString()
      },
      (error, data) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        console.log("Sent!", data);
        resolve(data);
      }
    );
  });
};

const app = express();
// app.use(history({
//   verbose: true
// }))
app.use(cors({ origin: "*" }));
app.use(express.json());

// app.use(serveStatic(__dirname + "/dist"));
app.use(express.static(root));
app.use(fallback("index.html", { root }));

app.post("/send-notification", async (req, res) => {
  // console.log('qwerty', req);
  let context = req.body;
  console.log({ body: context });
  sendEmail(context)
    .then(data => {
      res.send({
        status: 200,
        data: data
      });
    })
    .catch(error => {
      res.send({
        status: 500,
        data: error
      });
    });
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log("server started " + port);
