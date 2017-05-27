/**
 * Created by thanhqhc on 1/5/17.
 */

var apn_node = require('apn');
var path = require('path');

//console.log(__dirname + "/cert.pem");

var service = new apn_node.Provider({
    'cert': path.join(__dirname, 'key/cert.pem'),
    'key': path.join(__dirname, 'key/key.pem'),
    'production': false,
});


var apn = {

    /*
    Hàm push notification đến device ioss
        tokens là danh sách device_token cần bắn
        Title là tiêu đề hiển thị của thông báo
        Body là nội dung thông báo
        action là thông tin về hành động gọi thông báo ví dụ như: "Thêm sản phẩm"
        Badge là số phía trên của ứng dụng mặc định là 0
       Ex: apn.applePush(
             ["8f81af9febfb894dc609efa89ff88e0142b26d794df545fe6992fcc91666da32"]// ,
             "Hello Title",
             "This is body",
             "this is badge",
             "this is action"
         );
    */
    applePush: function (tokens,title,body,badge,action) {

        var notification = new apn_node.Notification();

        notification.body   = body;
        notification.title  = title;
        notification.badge  = badge == undefined ? 0 : badge;
        notification.sound  = "default";
        notification.topic = "com.eventgo.app";

        notification.setAction(action)
            .setMutableContent(1);
        notification.aps.category = "nodejs";

        service.send(notification, tokens).then(function (result) {
            console.log("APN Apple send: ");
            console.log(result);
        });
    }
};

/*
 {
 "aps":{
 "alert":{
 "body":"Hello, world!",
 "title":"node-apn",
 "action":"npm install"
 },
 "badge":10,
 "mutable-content": 1,
 "category":"nodejs"
 }
 }
 */

module.exports = apn;