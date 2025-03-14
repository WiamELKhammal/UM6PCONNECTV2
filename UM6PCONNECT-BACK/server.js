require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Assurez-vous que ce modèle existe
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
const { sendPasswordsToUnsentUsers } = require("./controllers/authController");
const userRoutes = require('./routes/userRoutes'); 
const changePasswordRoutes = require('./routes/changePassword');
const signinRoutes = require('./routes/signinRoutes');
const educationRoutes = require("./routes/educationRoutes");
const languageRoutes = require("./routes/languageRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const tagRoutes = require("./routes/tagRoutes");
const filterRoutes = require("./routes/filterRoutes");
const saveRoutes = require("./routes/saveRoutes");
const followRoutes = require("./routes/followRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const Complete = require('./routes/Complete');
// Connexion MongoDB
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
        await sendPasswordsToUnsentUsers(); // Call the function here
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



app.use("/api/users", userRoutes);
app.use("/api/change-password", changePasswordRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/complete', Complete);
app.use('/api/tags', tagRoutes);
app.use('/api/filter', filterRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/notification', notificationRoutes);


// Démarrer le serveur
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
