const amqp = require('amqplib');

const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitMQQueue = 'hello';

async function receiveMessage() {
  try {
    const connection = await amqp.connect(`amqp://${rabbitMQHost}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(rabbitMQQueue, { durable: false });
    console.log('Waiting for messages from RabbitMQ...');

    channel.consume(rabbitMQQueue, (message) => {
      if (message !== null) {
        console.log('Received message from RabbitMQ:', message.content.toString());
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error receiving messages from RabbitMQ:', error);
  }
}

// RabbitMQ'dan mesajları alma işlevini başlat
receiveMessage();
