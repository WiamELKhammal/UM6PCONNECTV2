require('dotenv').config();
const { createClient } = require('redis');

// Choisir l'URL Redis selon l'environnement
const redisUrl = process.env.REDIS_URL || process.env.REDIS_PUBLIC_URL;

const client = createClient({ url: redisUrl });

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Redis client connected");
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

module.exports = client;
