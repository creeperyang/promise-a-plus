var assert = require('assert');
var Promise = require('../promise.js');

describe('Custom Promise Test', function() {

    describe('#promise.catch', function() {

        describe('promise is rejected, reason is number.', function() {

            it('should run catch callback with the reason', function(done) {
                Promise.reject(1).catch(function(r) {
                    assert(r === 1, 'catch the reason(number)');
                    done();
                });
            });

        });

        describe('promise is rejected, reason is string.', function() {

            it('should run catch callback with the reason', function(done) {
                Promise.reject('no').catch(function(r) {
                    assert(r === 'no', 'catch the reason(string)');
                    done();
                });
            });

        });

        describe('promise is rejected, reason is boolean.', function() {

            it('should run catch callback with the reason', function(done) {
                Promise.reject(false).catch(function(r) {
                    assert(r === false, 'catch the reason(string)');
                    done();
                });
            });

        });

        describe('promise is rejected, reason is object.', function() {

            it('should run catch callback with the reason', function(done) {
                Promise.reject({x: 1}).catch(function(r) {
                    assert.deepEqual(r, {x: 1});
                    done();
                });
            });

        });

        describe('promise is rejected, reason is array.', function() {

            it('should run catch callback with the reason', function(done) {
                Promise.reject([1, 2, 3]).catch(function(r) {
                    assert.deepEqual(r, [1, 2, 3]);
                    done();
                });
            });

        });

        describe('promise is rejected by throw error.', function() {

            it('should run catch callback with error', function(done) {
                new Promise(function(fulfill, reject) {
                    throw 'error';
                }).catch(function(e) {
                    assert(e === 'error', 'catch the reason');
                    done();
                });
            });

        });

    });
});
