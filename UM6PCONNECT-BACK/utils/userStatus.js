const redisClient = require("./redisClient");

const getUserStatus = async (userId) => {
  const isOnline = await redisClient.exists(`online:${userId}`);
  if (isOnline) return { status: "online" };

  const lastSeen = await redisClient.get(`lastSeen:${userId}`);
  return {
    status: "offline",
    lastSeen: lastSeen ? new Date(lastSeen) : null,
  };
};

module.exports = { getUserStatus };
