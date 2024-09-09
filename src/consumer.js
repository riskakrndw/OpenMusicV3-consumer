require("dotenv").config();
const amqp = require("amqplib");
const SongService = require("./SongService");
const MailSender = require("./MailSender");
const Listener = require("./listener");

const init = async () => {
  const songService = new SongService();
  const mailSender = new MailSender();
  const listener = new Listener(songService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:song", {
    durable: true,
  });

  channel.consume("export:song", listener.listen, { noAck: true });
};

init();
