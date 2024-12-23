
const admin = require("firebase-admin");

// Load the service account credentials
const serviceAccount = require("./serviceAccountKey.json"); // Make sure the path is correct

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "bloger-new.appspot.com"
});

module.exports = admin;
