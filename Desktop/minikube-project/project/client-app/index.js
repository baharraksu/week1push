"use strict";
const express = require("express");
const amqp = require('amqplib');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const rabbitmqUrl = "amqp://localhost"; // RabbitMQ adresi
const port = 3000; // Uygulama portu
const queueName = 'message_queue'; // Kuyruk adı

// MySQL bağlantısı
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mysqlDatabase'
});

dbConnection.connect((err) => {
  if (err) {
      console.log("Database connection error:", err);
  } else {
      console.log("Database connected");
  }
});

let channel; // RabbitMQ kanalı

async function connectToRabbitMQ() {
  try {
      const connection = await amqp.connect(rabbitmqUrl);
      channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: false }); // Durable ayarı false olarak değiştirildi
      console.log('Connected to RabbitMQ');

      // Mesaj alıcı (Consumer) oluşturma
      channel.consume(queueName, (message) => {
          if (message !== null) {
              const data = JSON.parse(message.content.toString());
              console.log('Received message:', data);
              handleMessage(data);
              channel.ack(message); // Mesajı doğrulama
          }
      });
  } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
  }
}

// RabbitMQ'ya mesaj gönderme endpoint'i (isim ekleme)
app.post('/add-name', async (req, res) => {
    const { name } = req.body;

    try {
        await channel.sendToQueue(queueName, Buffer.from(name)); // Kanalı kullanarak mesaj gönderme
        console.log('Name sent to RabbitMQ:', name);
        res.send('Name sent to RabbitMQ: ' + name);
    } catch (error) {
        console.error('Error sending name to RabbitMQ:', error);
        res.status(500).send('Error sending name to RabbitMQ: ' + error.message);
    }
});

// GET isteğiyle sadece konsola mesaj yazdırma
app.get('/list-names', (req, res) => {
    try {
        // TODO: RabbitMQ'dan mesajları alarak listeleme işlemi buraya eklenecek
        res.send('List names endpoint'); // Geçici cevap
    } catch (error) {
        console.error('Error listing names from RabbitMQ:', error);
        res.status(500).send('Error listing names from RabbitMQ: ' + error.message);
    }
});
  
connectToRabbitMQ(); // Uygulamayı başlat

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
