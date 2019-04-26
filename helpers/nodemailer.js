const nodemailer = require('nodemailer');
const settings = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jdanmello@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
};
const transporter = nodemailer.createTransport(settings);

exports.nodemailer = function(options) {

  const emailMessage = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.message
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(emailMessage, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      };
    });
  });
};