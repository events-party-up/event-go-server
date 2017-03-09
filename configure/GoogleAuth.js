/**
 * Created by thanhqhc on 3/9/17.
 */
var auth = new GoogleAuth;

var client = new auth.OAuth2('633133829509-91rk6671rtm60nqdg0tiqjvhuenme6no.apps.googleusercontent.com', '', '');

function requestFacebookInfo(access_token) {

    var rxObject = Rx.Observable.create(function (observer) {
        client.verifyIdToken(
            req.body.token,
            [
                '799105536867-8tcdqtmv7krhgfh4tat9ch1b226t4kc7.apps.googleusercontent.com',
                '799105536867-mb2kn9vvcvcs2qqf6q9qqmj2rhbus82b.apps.googleusercontent.com',
                '633133829509-91rk6671rtm60nqdg0tiqjvhuenme6no.apps.googleusercontent.com',
                '633133829509-ljhkn3tfe9iodo0e8vmqdkk9e0eju73f.apps.googleusercontent.com'
            ],
            function(error, login) {
                if (error) {
                    observer.error(error);
                } else {
                    console.log("Login success: " + login);
                }
            }
        )
    }

    return rxObject;
}



module.exports = requestFacebookInfo;