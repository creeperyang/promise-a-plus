var Promise = require(require("path").join(__dirname,"/promise.js"));

module.exports = {
    resolved: function(value) {
        return Promise.resolve(value);
    },
    rejected: function(reason) {
        return Promise.reject(reason);
    },
    deferred: Promise.defer
};