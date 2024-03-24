const amqp = require('amqplib');

const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitMQQueue = 'hello';

async function sendMessage(message) {
  try {
    const connection = await amqp.connect(`amqp://${rabbitMQHost}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(rabbitMQQueue, { durable: false });
    channel.sendToQueue(rabbitMQQueue, Buffer.from(message));
    console.log('Message sent to RabbitMQ:', message);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
  }
}

// Örnek olarak bir mesaj gönderelim
sendMessage('Hello from client app!');
