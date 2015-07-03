# promise-a-plus

[![Build Status](https://travis-ci.org/creeperyang/promise-a-plus.svg?branch=master)](https://travis-ci.org/creeperyang/promise-a-plus)

This is a pure js implementation of Promises. It is a polyfill of ES6 Promises if ES6 is not supported.

**Note**: The implementation is surely [Promises/A+](https://promisesaplus.com/) conformant, so it will work well with other unstandard promises libraries.

## Installation

You can get the package easily via `npm`:

```shell
npm install promise-a-plus --save
```

## Usage

### Use with node

After install the module, import it and use with ease.

```js
var Promise = require('promise-a-plus');
// do whatever you like
Promise.race([xxx]) // ...
```

### Use inside browser

Currently, you can use the module via `browserify`.

## API

The library's API is absolutely consistent with official API.

### new Promise(executor)

<http://devdocs.io/javascript/global_objects/promise>

### then(onFulfilled, onRejected)

<http://devdocs.io/javascript/global_objects/promise/then>

### catch(onRejected)

<http://devdocs.io/javascript/global_objects/promise/catch>


### Promise.resolve(value)

<http://devdocs.io/javascript/global_objects/promise/resolve>

### Promise.reject(reason)

<http://devdocs.io/javascript/global_objects/promise/reject>

### Promise.all(array)

<http://devdocs.io/javascript/global_objects/promise/all>

Note: the `Promise.all` api may not be the same with official one, because currently the `argument` should be `array` only.

### Promise.race(array)

<http://devdocs.io/javascript/global_objects/promise/race>

Note: the `Promise.race` api may not be the same with official one, because currently the `argument` should be `array` only.

### Promise.deferred|Promise.defer

This API is not official, but it's common and useful. It's somewhat like AngularJS's `$q.defer()` or jQuery's `jQuery.Deferred()`.

```js
// currently the related promise `deferred.promise` is still pending
var deferred = Promise.deferred();
// then you can resolve or reject the promise
deferred.resolve(value); // deferred.reject(reason);
// and promise is now fulfilled/rejected
deferred.promise;
```

As chrome use `Promise.defer` as official API, `Promise.defer` is added to module(alias of `Promise.deferred`).

## Release History

2015-07-03&nbsp;&nbsp;&nbsp;&nbsp;`v0.5.1`&nbsp;&nbsp;&nbsp;&nbsp;add Promise.race; add Promise.defer

2015-06-17&nbsp;&nbsp;&nbsp;&nbsp;`v0.4.0`&nbsp;&nbsp;&nbsp;&nbsp;add Promise.deferred

2015-06-16&nbsp;&nbsp;&nbsp;&nbsp;`v0.3.0`&nbsp;&nbsp;&nbsp;&nbsp;add Promise.all

2015-06-11&nbsp;&nbsp;&nbsp;&nbsp;`v0.2.0`&nbsp;&nbsp;&nbsp;&nbsp;add promise.catch

2015-06-08&nbsp;&nbsp;&nbsp;&nbsp;`v0.1.0`&nbsp;&nbsp;&nbsp;&nbsp;init


## License
Copyright (c) 2015 creeperyang. Licensed under the MIT license.