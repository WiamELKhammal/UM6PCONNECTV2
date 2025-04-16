// utils/redisClient.js
const { createClient } = require('redis');

const client = createClient(); // Connexion à localhost:6379 par défaut

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await client.connect(); // Obligatoire avec Redis v4+
    console.log(" Redis client connected");
  } catch (err) {
    console.error(" Redis connection failed:", err);
  }
})();

module.exports = client;
