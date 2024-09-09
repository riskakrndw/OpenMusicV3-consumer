const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    console.log("MailSender 1");
    this._transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("MailSender 2");
  }

  sendEmail(targetEmail, content) {
    console.log("MailSender 3");
    const message = {
      from: "Open Music API",
      to: targetEmail,
      subject: "Ekspor Song",
      text: "Terlampir hasil dari ekspor Song",
      attachments: [
        {
          filename: "song.json",
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
