require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import HTTP for WebSocket support
const initializeSocket = require('./socket');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const server = http.createServer(app); // Create HTTP server

// Middleware
app.use(cors());

// ✅ Increase Payload Size Limit (50MB)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const { sendPasswordsToUnsentUsers } = require("./controllers/authController");
const userRoutes = require('./routes/userRoutes'); 
const changePasswordRoutes = require('./routes/changePassword');
const signinRoutes = require('./routes/signinRoutes');
const educationRoutes = require("./routes/educationRoutes");
const languageRoutes = require("./routes/languageRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const researchRoutes = require("./routes/researchRoutes");
const profileRoutes = require("./routes/profileRoutes");
const tagRoutes = require("./routes/tagRoutes");
const filterRoutes = require("./routes/filterRoutes");
const saveRoutes = require("./routes/saveRoutes");
const followRoutes = require("./routes/followRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const Complete = require('./routes/Complete');
const profilepictureRoutes = require('./routes/profilepictureRoutes');

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/um6pconnect';

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB Connected...');

    if (mongoose.connection.readyState === 1) {
      console.log("Checking for emailsent=false...");
      try {
        await sendPasswordsToUnsentUsers();
        console.log("Emails sent successfully at startup");
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
      }
    } else {
      console.error("MongoDB connection not ready, skipping email sending.");
    }
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/change-password", changePasswordRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/complete', Complete);
app.use('/api/tags', tagRoutes);
app.use('/api/filter', filterRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profilepicture', profilepictureRoutes);

// Initialize WebSockets
initializeSocket(server); // Call WebSocket function with the HTTP server

// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => { // Start server with WebSockets support
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
