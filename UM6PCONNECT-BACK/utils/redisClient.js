const { createClient } = require('redis');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const redisUrl = isProduction
  ? process.env.REDIS_URL // Railway : redis.railway.internal
  : process.env.REDIS_PUBLIC_URL; // Local : proxy.rlwy.net

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
