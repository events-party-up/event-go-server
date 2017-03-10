/**
 * Created by thanhqhc on 3/9/17.
 */
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var Rx = require('rxjs/Rx');



function requestGoogleInfo(body, access_token) {

    var rxObject = Rx.Observable.create(function (observer) {
        var client = new auth.OAuth2('633133829509-91rk6671rtm60nqdg0tiqjvhuenme6no.apps.googleusercontent.com', '', '');
        client.verifyIdToken(
            access_token,
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
                    observer.next(body);
                }
            }
        )
    });

    return rxObject;
}

module.exports = requestGoogleInfo;

var accessToken	= "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJmMmI1ZTZkOTZlMWQ0YzJjNmRhMjBhOGEwMGFjN2ZlNzdhYWNlOTAifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE0ODkwODM4MjMsImV4cCI6MTQ4OTA4NzQyMywiYXRfaGFzaCI6IkhFMXJaQkxpYnBVWTJ5Tl83bHZ2UEEiLCJhdWQiOiI2MzMxMzM4Mjk1MDktOTFyazY2NzFydG02MG5xZGcwdGlxanZodWVubWU2bm8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA2NzUxMTY4MTI0MDUxMjM4MjciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNjMzMTMzODI5NTA5LTkxcms2NjcxcnRtNjBucWRnMHRpcWp2aHVlbm1lNm5vLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJxaGN0aGFuaEBnbWFpbC5jb20iLCJuYW1lIjoiQ2jhuqVuIFRow6BuaCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTNYYWc4TXdRWVQ4L0FBQUFBQUFBQUFJL0FBQUFBQUFBRC13L2lRTDdaVHFyNU9vL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJDaOG6pW4iLCJmYW1pbHlfbmFtZSI6IlRow6BuaCIsImxvY2FsZSI6InZpIn0.Pn_JfUdj44t2-3fZrSnSemgAMYhIpDKvjyrWUcEiq1XkGgiDlXHiuwc9xA5RQWFRN8x3PE4r9qiL9TUH_dMhoets88SPYULEoaS8h7o1mxeXRPdBaf6hQ2qW44oFXRA9SMlfMwt5ImqMx-hxXyZ-nR7wrTo_ym-wETp5FLMTxL2tpX0TT5AHoG5T1msL3Fs6Y_cXJZGIc4gtq8xOy206C05Ashh-NtJJiIM-uGOLimLhy5tgnGIKlTYvVfxGot7uDLOvVdznyfNgru6nOfpm4Kw1Zqc6OH9wgvoS3jjeahFucG48lQb-hC3A5fqI1RSF_DoOV0AGFFY1kgQBTLfW9A";

requestGoogleInfo(accessToken).subscribe(function (login) {
    console.log(login);
}, function (error) {
    console.log(error);
});
