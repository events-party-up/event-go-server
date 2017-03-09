var Rx = require('rxjs/Rx');
var mongoose = require('mongoose');

module.exports = {

  findOne: function(object, params) {
    return  Rx.Observable.create(function (observer) {
        object.findOne(params, function(err, doc) {
          if (err) {
              observer.error(err);
          } else {
            if (doc == null) {
              observer.error('Not found');
            } else {
              observer.next(doc);
            }
          }
        })
    })
  },

  find: function(object, params) {

    var response = function(err, doc, observer) {
      if (err) {
          observer.error(err);
      } else {
        if (doc == null) {
          observer.error('Not found');
        } else {
          console.log(observer);
          observer.next(doc);
        }
      }
    };

    if (params == null) {
      return Rx.Observable.create(function (observer) {
        object.find(function(err,doc) {
          response(err,doc,observer);
        });
      });
    }

    return Rx.Observable.create(function (observer) {
      object.find(function(err,doc) {
        response(err,doc,observer);
      });
    });
  }
}
