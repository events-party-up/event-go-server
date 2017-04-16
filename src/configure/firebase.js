// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://project-2030561738355063960.firebaseio.com"
// });

// var gcloud = require('gcloud');

// var storage = gcloud.storage({
//   projectId: '2030561738355063960',
//   keyFilename: 'service-account-credentials.json'
// });

// var bucket = storage.bucket('project-2030561738355063960.appspot.com');
var fs = require('fs');
var storage = require('@google-cloud/storage');

var gcs = storage({
  projectId: '2030561738355063960',
  keyFilename: 'src/configure/service-account-credentials.json'
});

var bucket = gcs.bucket('project-2030561738355063960.appspot.com');

module.exports = bucket;