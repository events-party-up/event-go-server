/**
 * Created by thanhqhc on 3/9/17.
 */
var GoogleAuth = require('google-auth-library');
var Rx = require('rxjs/Rx');



function requestGoogleInfo(body, access_token) {

    var rxObject = Rx.Observable.create(function (observer) {
        var auth = new GoogleAuth;
        
		var client = new auth.OAuth2('799105536867-ebsqfeki0pb3h85osajcvm6h2o8i4f5q.apps.googleusercontent.com', '', '');
        client.verifyIdToken(
            access_token,
            [
                '799105536867-ebsqfeki0pb3h85osajcvm6h2o8i4f5q.apps.googleusercontent.com',
                '799105536867-8tcdqtmv7krhgfh4tat9ch1b226t4kc7.apps.googleusercontent.com',
                '799105536867-mb2kn9vvcvcs2qqf6q9qqmj2rhbus82b.apps.googleusercontent.com',
                '633133829509-91rk6671rtm60nqdg0tiqjvhuenme6no.apps.googleusercontent.com',
                '633133829509-ljhkn3tfe9iodo0e8vmqdkk9e0eju73f.apps.googleusercontent.com'
            ],
            function(error, login) {
                console.log("Call here with error");
                console.log(error);
                if (error) {
                    observer.error(error);
                } else {
                    observer.next(body);
                }
            }
        )
    });

    return rxObject;
}

module.exports = requestGoogleInfo;