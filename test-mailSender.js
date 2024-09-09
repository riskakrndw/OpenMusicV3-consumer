require("dotenv").config(); // Untuk memuat variabel environment
const MailSender = require("./src/MailSender");

// Buat instance dari MailSender
const mailSender = new MailSender();

// Uji pengiriman email
mailSender
  .sendEmail("testrecipient@example.com", "This is a test email from Node.js.")
  .then((info) => {
    console.log("Email sent successfully:", info);
  })
  .catch((err) => {
    console.error("Error sending email:", err);
  });
