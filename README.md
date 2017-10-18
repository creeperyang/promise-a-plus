# promise-a-plus

[![npm version](https://badge.fury.io/js/promise-a-plus.svg)](https://badge.fury.io/js/promise-a-plus)
[![Build Status](https://travis-ci.org/creeperyang/promise-a-plus.svg?branch=master)](https://travis-ci.org/creeperyang/promise-a-plus)
[![Coverage Status](https://coveralls.io/repos/github/creeperyang/promise-a-plus/badge.svg?branch=master)](https://coveralls.io/github/creeperyang/promise-a-plus?branch=master)
[![Dependency Status](https://david-dm.org/creeperyang/promise-a-plus.svg)](https://david-dm.org/creeperyang/promise-a-plus)
[![devDependency Status](https://david-dm.org/creeperyang/promise-a-plus/dev-status.svg)](https://david-dm.org/creeperyang/promise-a-plus#info=devDependencies)
[![npm](https://img.shields.io/npm/dm/promise-a-plus.svg)](https://www.npmjs.com/package/promise-a-plus)

<a href="https://promisesaplus.com/">
    <img src="https://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo" title="Promises/A+ 1.0 compliant" align="right" />
</a>

This is a JavaScript implementation of [*Promises/A+* spec](https://github.com/promises-aplus/promises-spec), and adequately tested.

Also a full featured polyfill for *ES6 Promise*.


## Install

[![NPM](https://nodei.co/npm/promise-a-plus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/promise-a-plus/)

## Usage

```js
var Promise = require('promise-a-plus');

var promise1 = Promise.resolve('nice');
var promise2 = new Promise(function(resolve, reject) {
   reject('just rejected');
});
Promise.race([promise1, promise2]).then(console.log.bind(console));
```

If you want to use in browser, use tools like `webpack` or `browserify`.

## API

The library's API is absolutely consistent with [official API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Also view [wiki](https://github.com/creeperyang/promise-a-plus/wiki/API).

## License
Copyright (c) 2015 creeperyang. Licensed under the MIT license.
