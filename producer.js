// producer.js
require("dotenv").config();
const amqp = require("amqplib");

const sendTestMessage = async () => {
  try {
    // Create a connection to RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    // Assert queue
    const queue = "export:song";
    await channel.assertQueue(queue, {
      durable: true,
    });

    // Create a message
    const message = {
      playlistId: 12345,
      targetEmail: "riskakurniad@gmail.com",
    };

    // Send message to the queue
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("Message sent:", message);

    // Close the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

sendTestMessage();
