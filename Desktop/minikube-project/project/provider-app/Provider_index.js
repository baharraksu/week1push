const amqp = require('amqplib');
const mysql = require('mysql2');

const rabbitmqUrl = 'amqp://localhost';
const queueName = 'message_queue';

// MySQL bağlantısı
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mysqlDatabase'
});

// Mesajı veritabanına kaydetme fonksiyonu
function saveMessageToDatabase(message) {
  return new Promise((resolve, reject) => {
    dbConnection.query('INSERT INTO messages (content) VALUES (?)', [message], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function startProvider() {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    console.log('Provider connected to RabbitMQ and waiting for messages...');

    // Kuyruğu dinleme
    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log('Received message from RabbitMQ:', message);

        // Mesajı veritabanına kaydetme
        try {
          await saveMessageToDatabase(message);
          console.log('Message saved to database successfully.');
        } catch (error) {
          console.error('Error saving message to database:', error);
        }

        // Mesajın doğrulamasını yapma ve kuyruktan çıkarma
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// MySQL bağlantısını açma
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('MySQL connected');
  
  // Express sunucuyu dinleme
  startProvider();
});

