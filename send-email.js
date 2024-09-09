const nodemailer = require("nodemailer");

// Buat konfigurasi transporter dengan kredensial Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io", // Host Mailtrap
  port: 2525, // Port default Mailtrap
  auth: {
    user: "ad881d3aa8418b", // Ganti dengan username dari Mailtrap
    pass: "a6f92d3ac08411", // Ganti dengan password dari Mailtrap
  },
});

// Buat pesan email yang akan dikirim
const message = {
  from: "riskakurniad@gmail.com", // Email pengirim
  to: "riskakurniad@gmail.com", // Email penerima
  subject: "Test Email", // Subjek email
  text: "This is a test email from Node.js using Nodemailer and Mailtrap.", // Isi pesan
};

// Kirim email
transporter.sendMail(message, (err, info) => {
  if (err) {
    console.error("Error sending email:", err);
  } else {
    console.log("Email sent: ", info);
  }
});
