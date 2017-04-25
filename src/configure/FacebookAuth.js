/**
 * Created by thanhqhc on 3/9/17.
 */
var request = require('request');
var Rx = require('rxjs/Rx');

var requestString = "https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cgender%2Cbirthday%2Cage_range%2Cemail%2Cdevices%2Cpicture%7Burl%7D&access_token="

function requestFacebookInfo(body, access_token) {

    var rxObject = Rx.Observable.create(function (observer) {

        request(requestString + access_token, function(err, response, bodyT) {

            if (err) {
                observer.error(error);
                return;
            }

            if (body) {
                var bodyData = JSON.parse(bodyT);
                var error = bodyData.error;
                if (error) {
                    observer.error('access_token fail');
                    console.log(error);
                    return;
                }

                var profileData = {
                    'provider_type': 'facebook',
                    'provider_id': bodyData.id,
                    'provider_access_token': access_token,
                    'name': bodyData.name,
                    'birthday': bodyData.birthday == null ? 0 : new Date(bodyData.birthday),
                    'email': bodyData.email == null ? "" : bodyData.email,
                    'age': bodyData.age_range == null ? 0 : bodyData.age_range.min,
                    'image_url': bodyData.picture == null? "" : bodyData.picture.data.url,
                    'gender': bodyData.gender == null ? "male" : bodyData.gender,
                };

                var util = require('../Utility/Utility');
                profileData = util.extendObject(body,profileData);

                observer.next(profileData);
            } else  {
                observer.error('Error not found');
                return;
            }
        });
    });

    return rxObject;
}


module.exports = requestFacebookInfo;