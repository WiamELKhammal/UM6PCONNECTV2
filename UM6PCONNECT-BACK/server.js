require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // ✅ Sécurité HTTP
const http = require('http');
const bodyParser = require('body-parser');
const initializeSocket = require('./socket');
const path = require("path");

const app = express();
const server = http.createServer(app);

// ✅ Middleware de sécurité
app.use(cors());
app.use(helmet()); // <- Sécurité HTTP Headers

// ✅ Payload size
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ Controller pour envoi de mails initiaux
const { sendPasswordsToUnsentUsers } = require("./controllers/authController");

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const changePasswordRoutes = require('./routes/changePassword');
const signinRoutes = require('./routes/signinRoutes');
const signupRoutes = require('./routes/signupRoutes');
const resendOtpRoute = require("./routes/resendOtp");
const verifyotp = require("./routes/verifyotp");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");
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
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
const statusLastSeenRoutes = require("./routes/statusLastSeenRoutes");

// ✅ MongoDB connection
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

// ✅ Register API routes
app.use("/api/users", userRoutes);
app.use("/api/change-password", changePasswordRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/lastSeen", statusLastSeenRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/verify-otp", verifyotp);
app.use("/api/resend-otp", resendOtpRoute);
app.use("/api/experience", experienceRoutes);
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
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/reset-password", resetPasswordRoutes);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ✅ WebSocket init
initializeSocket(server);

// ✅ Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
