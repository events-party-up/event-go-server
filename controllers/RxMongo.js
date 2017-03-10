var Rx = require('rxjs/Rx');
var mongoose = require('mongoose');

module.exports = {

    query: function(func,params,canNull) {

        if (canNull == undefined) {
            canNull = true;
        }

        if (params == undefined) {
            canNull = {};
        }

        return  Rx.Observable.create(function (observer) {
            console.log(func);
            func(function(err,doc){
                console.log('asdsadasdsa');
                if (err) {
                    observer.error(err);
                } else {
                    if (doc == null && !canNull) {
                        observer.error('Not found');
                    } else {
                        observer.next(doc);
                    }
                }
            });
        });
    },

    findOne: function(object, params, canNull) {

        if (canNull == undefined) {
            canNull = true;
        }

        return  Rx.Observable.create(function (observer) {

            object.findOne(params, function(err, doc) {

                if (err) {
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
    findOneAndUpdated: function(object,query, params) {

        return  Rx.Observable.create(function (observer) {

            object.findOneAndUpdate(query,params, {new: true}, function(err, doc) {

                if (err) {
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

    find: function(object, params) {

        var response = function(err, doc, observer) {
            if (err) {
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
    },

    save: function(object) {

        return Rx.Observable.create(function (observer) {

            object.save(function (err) {

                if(err) {
                    observer.error(err);
                } else {
                    observer.next();
                }
            });
        });
    },
    
    remove: function (object, condition) {

        return Rx.Observable.create(function (observer) {

            object.remove(condition, function (err) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next();
                }
            });
        });
    }
};
