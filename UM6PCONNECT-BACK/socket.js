const { Server } = require("socket.io");
let onlineUsers = new Map(); // Store userId -> Set of socketIds

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // 📌 When a user joins, track all their socket connections
    socket.on("join", (userId) => {
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);
      console.log(`User ${userId} is online. Active sockets: ${[...onlineUsers.get(userId)]}`);
    });

    // 📌 Handle Sending Messages
    socket.on("sendMessage", async ({ senderId, receiverId, text, file }) => {
      if (!text.trim() && !file) {
        console.log("❌ Cannot send empty message.");
        return;
      }
    
      const Message = require("./models/Message");
    
      try {
        const newMessage = new Message({
          senderId,
          receiverId,
          text: text.trim(), // ✅ Ensure text is included
          isRead: false,
        });
    
        await newMessage.save();
    
        if (onlineUsers.has(receiverId)) {
          onlineUsers.get(receiverId).forEach((socketId) => {
            io.to(socketId).emit("receiveMessage", newMessage);
          });
        }
    
        io.to(socket.id).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
    
    
    // 📌 Handle User Disconnection
    socket.on("disconnect", () => {
      let disconnectedUser = null;

      // Find the user associated with this socket and remove it
      for (let [userId, sockets] of onlineUsers.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          disconnectedUser = userId;

          // If no sockets remain for the user, remove them from `onlineUsers`
          if (sockets.size === 0) {
            onlineUsers.delete(userId);
          }
          break;
        }
      }

      console.log(`User ${disconnectedUser} disconnected. Remaining sockets:`, onlineUsers.get(disconnectedUser) || []);
    });
  });

  return io;
};

module.exports = initializeSocket;