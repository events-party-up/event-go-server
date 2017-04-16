var axious = require('../configure/axious');
var kFacebookGraphAPI = "https://graph.facebook.com/v2.8"
var util = require('util');
var Rx = require('rxjs/Rx'); 
var private_access_token = "EAAS1hofs0M8BAEXT6gTM1S5z85VSrAiexpQEUFJGJZBZAuAqkNdFV5vjoZCWFseHN2zxGYmrpiLGNU9vDcNDbtw0zNLVq2KcQ0y0SEP80Fo9nZAf7D52pxpppkdb5tZBQPOfBvmU1FOP3US1XbujEERHrVvLpqlIZD";
function requestFBURL(path,params,access_token) {
    var requestURL = util.format("%s/%s?access_token=%s&%s", kFacebookGraphAPI,path,access_token,params)
    console.log(requestURL);
    return requestURL;
}
var fieldPost = 'fields=created_time,id,message,from,permalink_url'
var fbAPI = {

    getPostInfo: function(id, access_token) {

        return Rx.Observable.create(function(observe){
            var requestURL = requestFBURL(id,fieldPost,private_access_token);

            axious.get(requestURL).then(function(response){
                if (response.status !== 200) {
                    observe.error('Not success');
                    return;
                }

                var content = response.data;
                observe.next(content);
            }).catch(function(error){
                observe.error(error);
            })
        })
    },
}

module.exports = fbAPI;

