const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user:process.env.EMAIL_USER, // Your email address
    pass:process.env.EMAIL_PASS, // Your email password or App Password
  },
});

const mailsender = async ({ email, subject, template }) => {
  try {
    await transporter.sendMail({
      from: '"E-commerce Team" <team@taskmanager.com>',
      to: email,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};
module.exports = { mailsender };
