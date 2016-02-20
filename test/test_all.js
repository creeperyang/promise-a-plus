var assert = require('assert');
var Promise = require('../promise.js');

describe('Custom Promise Test', function() {

    describe('#Promise.all', function() {

        describe('argument is not iterable.', function() {

            it('should throw error', function(done) {
                try {
                    Promise.all();
                    done('should not invoke');
                } catch (e) {
                    done();
                }
            });

        });

        describe('argument is empty string.', function() {

            it('should return a promise with empty array as its value', function(done) {
                Promise.all('').then(function(v) {
                    assert.deepEqual(v, []);
                    done();
                });
            });

        });

        describe('argument is empty array.', function() {

            it('should return a promise with empty array as its value', function(done) {
                Promise.all('').then(function(v) {
                    assert.deepEqual(v, []);
                    done();
                });
            });

        });

        describe('argument is array of primitives.', function() {

            it('should return a promise with all primitives as its value', function(done) {
                Promise.all([1, 'yes', true, null]).then(function(v) {
                    assert.deepEqual(v, [1, 'yes', true, null]);
                    done();
                });
            });

        });

        describe('argument is array of promises.', function() {

            it('should return a promise with all promises\' values as its value', function(done) {
                Promise.all([Promise.resolve('x'), Promise.resolve(null), Promise.resolve(true), Promise.resolve([1, 2, 3])]).then(function(v) {
                    assert.deepEqual(v, ['x', null, true, [1, 2, 3]]);
                    done();
                });
            });

            it('should return a promise who immediately rejected when one promise rejected', function(done) {
                Promise.all([Promise.reject('x'), Promise.resolve(null), Promise.resolve(true), Promise.resolve([1, 2, 3])]).catch(function(r) {
                    assert.equal(r, 'x');
                    done();
                });
            });

        });

        describe('argument is array mixed of primitives and promises.', function() {

            it('should return a promise with primitives and promises\' values as its value', function(done) {
                Promise.all([1, 'yes', Promise.resolve({x: 1}), Promise.resolve(null)]).then(function(v) {
                    assert.deepEqual(v, [1, 'yes', {x: 1}, null]);
                    done();
                });
            });

            it('should return a promise who immediately rejected when one promise rejected', function(done) {
                Promise.all(['xyz', Promise.reject('x'), Promise.resolve([1, 2, 3])]).catch(function(r) {
                    assert.equal(r, 'x');
                    done();
                });
            });

        });

    });
});
