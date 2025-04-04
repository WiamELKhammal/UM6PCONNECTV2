const { Server } = require("socket.io");
const redisClient = require("./utils/redisClient");

let onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", async (userId) => {
      if (!userId) return;
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);

      // ✅ Store online state in Redis with TTL
      await redisClient.set(`online:${userId}`, "1", { EX: 60 }); // 60 sec TTL
    });

    socket.on("heartbeat", async (userId) => {
      if (userId) {
        await redisClient.set(`online:${userId}`, "1", { EX: 60 }); // refresh TTL
      }
    });

    socket.on("disconnect", async () => {
      let disconnectedUser = null;

      for (let [userId, sockets] of onlineUsers.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            onlineUsers.delete(userId);
            disconnectedUser = userId;
            await redisClient.del(`online:${userId}`);
            await redisClient.set(`lastSeen:${userId}`, new Date().toISOString());
          }
          break;
        }
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
