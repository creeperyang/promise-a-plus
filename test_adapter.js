var Promise = require(require("path").join(__dirname,"/promise.js"));

module.exports = {
    resolved: function(value) {
        return Promise.resolve(value);
    },
    rejected: function(reason) {
        return Promise.reject(reason);
    },
    deferred: function() {
        var o = {};
        o.promise = new Promise(function(resolve,reject){
            o.resolve = resolve;
            o.reject = reject;
        });
        return o;
    }
};