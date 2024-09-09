// consumer.js
require("dotenv").config();
const amqp = require("amqplib");

const receiveMessages = async () => {
  try {
    // Create a connection to RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    // Assert queue
    const queue = "export:song";
    await channel.assertQueue(queue, {
      durable: true,
    });

    // Set up consumer
    console.log("Waiting for messages in queue:", queue);
    channel.consume(
      queue,
      (message) => {
        if (message !== null) {
          console.log("Message received:", message.content.toString());
          channel.ack(message); // Acknowledge the message
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error receiving message:", error);
  }
};

receiveMessages();
