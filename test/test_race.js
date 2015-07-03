var assert = require('assert');
var Promise = require('../promise.js');

describe('Custom Promise Test', function() {

    describe('#Promise.race', function() {

        describe('arguments is array of primitives.', function() {

            it('should return a promise with the first primitives as its value', function(done) {
                Promise.race([1, 'yes', true, null]).then(function(v) {
                    assert.equal(v, 1);
                    done();
                });
            });

        });

        describe('arguments is array of promises.', function() {

            it('should return a promise with the first resolved promises\' values as its value', function(done) {
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

            it('should return a promise with the first rejected promises\' reason as its reason', function(done) {
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
