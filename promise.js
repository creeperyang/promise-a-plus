'use strict';

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise(executor) {
    var state = PENDING;

    // store value once FULFILLED or REJECTED
    var value = null;

    // store sucess & failure handlers
    var handlers = [];

    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(function() {
                    then.apply(result, arguments);
                }, resolve, reject);
                return;
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED &&
                typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED &&
                typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

    this.done = function(onFulfilled, onRejected) {
        // ensure we are always asynchronous
        setTimeout(function() {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    };

    var then = function(onFulfilled, onRejected) {
        var self = this;
        var res;
        var npromise = new Promise(function(resolve, reject) {
            return self.done(function(result) {
                if (typeof onFulfilled === 'function') {
                    try {
                        res = onFulfilled(result);
                        if (res === npromise) {
                            return reject(new TypeError('The `promise` and `x` refer to the same object.'));
                        }
                        return resolve(res);
                    } catch (e) {
                        return reject(e);
                    }
                } else {
                    return resolve(result);
                }
            }, function(error) {
                if (typeof onRejected === 'function') {
                    try {
                        res = onRejected(error);
                        if (res === npromise) {
                            return reject(new TypeError('The `promise` and `x` refer to the same object.'));
                        }
                        return resolve(res);
                    } catch (ex) {
                        return reject(ex);
                    }
                } else {
                    return reject(error);
                }
            });
        });
        return npromise;
    };

    this.then = then;

    this.catch = function(onRejected) {
        return then.call(this, undefined, onRejected);
    };

    doResolve(executor, resolve, reject);
}

/**
 * Check if a value is a Promise and, if it is,
 * return the `then` method of that promise.
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
function getThen(value) {
    var type = typeof value;
    var then;
    if (value && (type === 'object' || type === 'function')) {
        then = value.then;
        if (typeof then === 'function') {
            return then;
        }
    }
    return null;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * ensure asynchronous execution of onFulfilled/onRejected
 *
 * @param {Function} fn A resolver function that may not be trusted
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
        fn(function(value) {
            if (done) {
                return;
            }
            done = true;
            setTimeout(function() {
                onFulfilled(value);
            }, 0);
        }, function(reason) {
            if (done) {
                return;
            }
            done = true;
            setTimeout(function() {
                onRejected(reason);
            }, 0);
        });
    } catch (e) {
        if (done) {
            return;
        }
        done = true;
        setTimeout(function() {
            onRejected(e);
        }, 0);
    }
}

Promise.resolve = function(value) {
    return new Promise(function(resolve, reject) {
        resolve(value);
    });
};

Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
        reject(reason);
    });
};

Promise.all = function(all) {
    var results = [];
    var len, promise, i;
    var resolved = 0;
    if(!all || !(len = all.length)) {
        throw new Error('ArgumentsError: currently only array is allowed');
    }
    return new Promise(function(resolve, reject) {
        for(i = 0; i < len; i++) {
            (function(i) {
                promise = all[i];
                if(!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise);
                }
                promise.catch(function(reason) {
                    reject(reason);
                });
                promise.then(function(value) {
                    results[i] = value;
                    if(++resolved === len) {
                        resolve(results);
                    }
                });
            })(i);
        }
    });
};

// Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, 
// with the value or reason from that promise.
Promise.race = function(array) {
    var deferred;
    if(!array || !array.length) {
        throw new Error('ArgumentsError: currently only array is allowed');
    }
    deferred = Promise.deferred();
    array.forEach(function(promise) {
        if(promise instanceof Promise) {
            promise.then(function(value) {
                deferred.resolve(value);
            }, function(reason) {
                deferred.reject(reason);
            });
        } else {
            // if not promise, immediately resolve result promise
            deferred.resolve(promise);
        }
    });
    return deferred.promise;
};

/**
 * A useful api for Promise,
 * return the `deferred` object binding to a promise. 
 * And you can control the promise via `deferred.resolve`/`deferred.reject`.
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
Promise.deferred = function() {
    var deferred = {};
    deferred.promise = new Promise(function(resolve,reject){
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};

// Official API (especially chrome) is Promise.defer
// so just add Promise.defer and let it refer to Promise.deferred
Promise.defer = Promise.deferred;

module.exports = Promise;
