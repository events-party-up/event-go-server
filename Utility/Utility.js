/**
 * Created by thanhqhc on 3/10/17.
 */
module.exports = {

    extendObject: function(obj, src) {
        Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
        return obj;
    }
};


