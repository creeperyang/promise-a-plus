var assert = require('assert');
var Promise = require('../promise.js');

describe('Custom Promise Test', function() {

    describe('#Promise.race', function() {

        describe('argument is not iterable.', function() {

            it('should throw error', function(done) {
                try {
                    Promise.race();
                    done('should not invoke');
                } catch (e) {
                    done();
                }
            });

        });

        describe('argument is array of primitives.', function() {

            it('should return a promise with the first primitive as its value', function(done) {
                Promise.race([1, 'yes', true, null]).then(function(v) {
                    assert.equal(v, 1);
                    done();
                });
            });

            it('should return a promise with the first primitive (undefined) as its value', function(done) {
                Promise.race([undefined]).then(function(v) {
                    assert.equal(v, undefined);
                    done();
                });
            });

        });

        describe('argument\'s length is 0.', function() {
            it('should return a promise whose state is pending', function(done) {
                Promise.race([]).then(function() {
                    done('should not invoke');
                }).catch(function() {
                    done('should not invoke');
                });
                setTimeout(done, 200);
            });

            it('should return a promise whose state is pending', function(done) {
                Promise.race('').then(function() {
                    done('should not invoke');
                }).catch(function() {
                    done('should not invoke');
                });
                setTimeout(done, 200);
            });
        });

        describe('argument is array of promises.', function() {

            it('should return a promise with the first resolved promise\'s value as its value', function(done) {
                var p1 = new Promise(function(resolve, reject) { 
                    setTimeout(resolve, 500, 'one'); 
                });
                var p2 = new Promise(function(resolve, reject) { 
                    setTimeout(resolve, 100, 'two'); 
                });
                Promise.race([p1, p2]).then(function(v) {
                    assert.equal(v, 'two');
                    done();
                });
            });

            it('should return a promise with the first rejected promise\'s reason as its reason', function(done) {
                var p1 = new Promise(function(resolve, reject) { 
                    setTimeout(reject, 500, 'one'); 
                });
                var p2 = new Promise(function(resolve, reject) { 
                    setTimeout(reject, 100, 'two'); 
                });
                Promise.race([p1, p2]).catch(function(r) {
                    assert.equal(r, 'two');
                    done();
                });
            });

        });

    });
});
