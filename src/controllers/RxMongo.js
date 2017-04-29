var Rx = require('rxjs/Rx');
var mongoose = require('mongoose');

module.exports = {

    findOne: function(object, params, canNull, protection) {
        if (canNull == undefined) {
            canNull = true;
        }

        if (protection == null) {
            protection = { '__v': false}
        }

        return  Rx.Observable.create(function (observer) {

            object.findOne(params,protection, function(err, doc) {

                if (err) {
                    console.log("FindOne failure with Object " + object);
                    console.log("Error: " + err);
                    observer.error(err);
                } else {
                    if (doc == null && !canNull) {
                        observer.error('Not found');
                    } else {
                        observer.next(doc);
                    }
                }
            })
        })
    },
    findOneAndUpdated: function(object,query, params,protection) {

        if (protection == null) {
            protection = { '__v': false}
        }

        return  Rx.Observable.create(function (observer) {

            object.findOneAndUpdate(query,params,protection, function(err, doc) {

                if (err) {
                    console.log("findOneAndUpdate failure with Object " + object);
                    console.log("Error: " + err);
                    observer.error(err);
                } else {
                    if (doc == null ) {
                        observer.error('Not found');
                    } else {
                        observer.next(doc);
                    }
                }
            })
        })
    },

    find: function(object, params, protection) {

      if (protection == null) {
        protection = { '__v': false}
      }

      console.log(params);

        var response = function(err, doc, observer) {
            if (err) {
                console.log("find failure with Object " + object);
                observer.error(err);
            } else {
                if (doc == null) {
                    observer.error('Not found');
                } else {
                    observer.next(doc);
                }
            }
        };

        if (params == null) {
            return Rx.Observable.create(function (observer) {
                object.find({}, protection, function(err,doc) {
                    response(err,doc,observer);
                });
            });
        }

        return Rx.Observable.create(function (observer) {
            object.find(params,function(err,doc) {
                response(err,doc,observer);
            });
        });
    },

    save: function(object) {

        return Rx.Observable.create(function (observer) {

            object.save(function (err) {

                if(err) {
                    console.log("save failure with Object " + object);
                    console.log("Error: " + err);
                    observer.error(err);
                } else {
                    observer.next(object);
                }
            });
        });
    },

    remove: function (object, condition) {

        return Rx.Observable.create(function (observer) {

            object.remove(condition, function (err) {
                if (err) {
                    console.log("remove failure with Object " + object);
                    console.log("Error: " + err);
                    observer.error(err);
                } else {
                    observer.next('Delete success');
                }
            });
        });
    }
    
};
