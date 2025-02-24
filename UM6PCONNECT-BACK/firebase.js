const admin = require('firebase-admin');
const path = require('path');

// Path to the service account key file
const serviceAccount = path.join(__dirname, 'credentials.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://um6pconnect.firebaseio.com', // Replace with your actual database URL
});
