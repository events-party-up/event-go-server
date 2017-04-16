module.exports = function() {
    var fbapi = require('./Utility/facebookapi');
    // fbapi.getPostInfo('431550933656672_1068431463301946','1325489317531855|e012257493bb143871ad6d83cf194d32')
    // .subscribe(function(data){
    //     console.log(data);
    // },
    // function(error) {
    //     console.log('failure');
    // }
    // )

    var bucket = require('./configure/firebase');
    var fs = require('fs');
    bucket.upload(__dirname + '/../public/images/clipboard.png', function(err, file) {
        if (!err) {
            // "zebra.jpg" is now in your bucket.
            
        }
        console.error(err);
        console.log(file);
    });

    // var writeStream = fs.createWriteStream(__dirname + '/../public/images/clipboard.png');
    // var remoteFile = bucket.file('clipboard.png');
    // var configure = {
    //         metadata: {
    //             contentType: 'image/png',
    //             metadata: {
    //                 custom: 'metadata'
    //             }
    //         }
    //     };
    // remoteFile.createReadStream(configure)
    //     .on('error', function(error){
    //         console.log('error');
    //         console.error(error);
    //     })
    //     .on('response', function(response){
    //         console.log('success');
    //         console.log(response.toJSON());
    //     })
    //     .on('end', function(){
    //         console.log('end');
    //     })
    //     .pipe(writeStream);


};

// 1325489317531855
// e012257493bb143871ad6d83cf194d32
// "EAAS1hofs0M8BAIlMZCGUTLxiXqISvEAKqHfT4afgtujtxy0WHZC7e6tuvz7mPpw80Ax98Tbi2j6Mv43y3r4PCBGkgETHxiaByWCdfnKJh8L9rvBo9UNM2NpSXZBy1SXtnmISjojwJyLpiQXyDPRzEKovV9EgISuZBY00aJpcZA5wE68eVAoRCBm0bqiyEZCmTGzApdgQGLvkQcvEgnWQ3wkfc0fSv7xVEZD"	
// GET /oauth/access_token?  
//     grant_type=fb_exchange_token&amp;           
//     client_id={app-id}&amp;
//     client_secret={app-secret}&amp;
//     fb_exchange_token={short-lived-token}

// /oauth/access_token?grant_type=fb_exchange_token&client_id=1325489317531855&client_secret=e012257493bb143871ad6d83cf194d32&fb_exchange_token=EAAS1hofs0M8BAIlMZCGUTLxiXqISvEAKqHfT4afgtujtxy0WHZC7e6tuvz7mPpw80Ax98Tbi2j6Mv43y3r4PCBGkgETHxiaByWCdfnKJh8L9rvBo9UNM2NpSXZBy1SXtnmISjojwJyLpiQXyDPRzEKovV9EgISuZBY00aJpcZA5wE68eVAoRCBm0bqiyEZCmTGzApdgQGLvkQcvEgnWQ3wkfc0fSv7xVEZD