const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7d79dc57c66fdf",
      pass: "6c0f3c101320b0"
    }
  });