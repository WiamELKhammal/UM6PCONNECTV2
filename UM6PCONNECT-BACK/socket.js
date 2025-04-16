const { Server } = require("socket.io");
const redisClient = require("./utils/redisClient");

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    // When a user joins
    socket.on("join", async (userId) => {
      if (!userId) return;

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);

      try {
        await redisClient.set(`online:${userId}`, "1");
        io.emit("updateUserStatus", { userId, status: "online" });
        console.log("✅ JOIN RECEIVED from user:", userId);
        console.log("✅ Redis key set: online:" + userId);
      } catch (err) {
        console.error("Redis set failed:", err);
      }
    });

    // Heartbeat
    socket.on("heartbeat", async (userId) => {
      if (!userId) return;
      try {
        await redisClient.set(`online:${userId}`, "1");
        console.log("[Heartbeat] Refreshed Redis key for:", userId);
      } catch (err) {
        console.error("Heartbeat error:", err);
      }
    });

    // ✅ TYPING support
    socket.on("typing", ({ senderId, receiverId }) => {
      console.log("✏️ Typing from:", senderId, "to", receiverId);
      io.emit("typing", { userId: senderId, to: receiverId });
    });

    // ✅ DISCONNECT logic
    socket.on("disconnect", async () => {
      let disconnectedUser = null;

      for (const [userId, sockets] of onlineUsers.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);

          if (sockets.size === 0) {
            onlineUsers.delete(userId);
            disconnectedUser = userId;

            try {
              await redisClient.del(`online:${userId}`);
              await redisClient.set(`lastSeen:${userId}`, Date.now());
              io.emit("updateUserStatus", { userId, status: "offline" });
              console.log("❌ Disconnected:", userId, "→ Last seen saved.");
            } catch (err) {
              console.error("Redis disconnect error:", err);
            }
          }

          break;
        }
      }

      console.log("[Socket] disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
