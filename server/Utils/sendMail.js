const nodemailer = require("nodemailer");
// options email subject ,message
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gamil',
    auth: {
      user: "workholic8989@gmail.com",
      pass: "whxhsuotrolpxpvj",
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
  
};

module.exports = sendMail;
