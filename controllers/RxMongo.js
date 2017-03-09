var Rx = require('rxjs/Rx');
var mongoose = require('mongoose');

module.exports = {

  findOne: function(object, params) {
    return object.findOne(params, function(err, doc) {
      if (err) {
          observe.onError(err);
      } else {
        if (doc == null) {
          observe.onError('Not found');
        } else {
          observe.onNext(doc);
        }
      }
    })
  },

  find: function(object, params) {

    var response = function(err, doc) {
      if (err) {
          observe.onError(err);
      } else {
        if (doc == null) {
          observe.onError('Not found');
        } else {
          observe.onNext(doc);
        }
      }
    };

    if (params == null) {
      return object.find(response);
    }

    return object.find(params, response);  
  }
}
