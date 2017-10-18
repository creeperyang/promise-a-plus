var Promise = require('../promise.js');

suite('Promise-a-plus', function() {
    set('iterations', 1000);
    set('type', 'static');

    bench('then', function(done) {
        var defer = Promise.defer();

        defer.promise.then(function() {
            done();
        });

        defer.resolve('ok');
    });

    bench('reject', function(done) {
        var defer = Promise.defer();

        defer.promise.then(function() {
        }, function() {
            done();
        });

        defer.reject('rejected');
    });

    bench('catch', function(done) {
        var defer = Promise.defer();

        defer.promise
            .then(function() {
                throw new Error('Catch me if you can');
            })
            .catch(function(err) {
                done(err);
            });

        defer.resolve('ok');
    });

    bench('then next tick', function(done) {
        var defer = Promise.defer();

        defer.promise.then(function() {
            done();
        });

        setImmediate(function() {
            defer.resolve('ok');
        });
    });

    bench('all + then', function(done) {
        var deferA = Promise.defer(),
            deferB = Promise.defer();

        Promise.all([deferA.promise, deferB.promise])
            .then(function(a) {
                done();
            });

        deferA.resolve('ok');

        setImmediate(function() {
            deferB.resolve('ok');
        });
    });
});
