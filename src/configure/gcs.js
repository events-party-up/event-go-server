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
var Rx = require('rxjs/Rx');
var util = require('util');

var gcs = storage({
  projectId: '2030561738355063960',
  keyFilename: 'src/configure/service-account-credentials.json'
});

var appBucket = 'project-2030561738355063960.appspot.com';
var bucket = gcs.bucket('project-2030561738355063960.appspot.com');
var imagePrefix = 'https://storage.googleapis.com/project-2030561738355063960.appspot.com/'
module.exports = {

  upload:function(file_name,supplier_id) {
    return Rx.Observable.create(function(observer) {
      
      bucket.upload(__dirname + '/../../'+file_name +".jpg",{
          public: true,
          metadata: {
              contentType: 'image/jpg',
          },
          destination: supplier_id+ "/" +file_name +".jpg"
      }, function(err, file) {
          
          if (err !== null) {
              observer.error(err);
          } else {
            var publicLink = util.format('https://storage.googleapis.com/%s/%s/%s.jpg', appBucket,supplier_id,file_name);
            observer.next(publicLink);
          }

          fs.unlink(__dirname + '/../../'+file_name +".jpg", function(err){
              console.log("call next");
              if(err) return console.log(err);
              console.log('file deleted successfully');
          });
      });
    })
  },

  deleteFile: function(image_url) {
    return Rx.Observable.create(function(observer) {
      var newURL = image_url.replace(imagePrefix,"");
      var file = bucket.file(newURL)

      file.delete(function(err){
        if (err) {
          observer.error(err);
          return;
        }
          observer.next();
      })
    })
  }

};