const { createClient } = require('redis');

// Railway injecte REDIS_URL automatiquement en production
const redisUrl = process.env.REDIS_URL;

const client = createClient({ url: redisUrl });

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Redis client connected to:", redisUrl);
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

module.exports = client;
