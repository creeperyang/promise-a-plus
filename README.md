#promise-a-plus[![Build Status](https://travis-ci.org/creeperyang/promise-a-plus.svg?branch=master)](https://travis-ci.org/creeperyang/promise-a-plus)

This is a pure js implementation of Promises. It is a polyfill of ES6 Promises if ES6 is not supported.

**Note**: The implementation is surely [Promises/A+](https://promisesaplus.com/) conformant, so it will work well with other unstandard promises libraries.


##API and Usage

Firstly import the library:

```js
var Promise = require('promise-a-plus');
```

### new Promise(executor)

http://devdocs.io/javascript/global_objects/promise

### then(onFulfilled, onRejected)

http://devdocs.io/javascript/global_objects/promise/then


### Promise.resolve(value)

http://devdocs.io/javascript/global_objects/promise/resolve

### Promise.resolve(reason)

http://devdocs.io/javascript/global_objects/promise/reject


## Release History

2015-06-08&nbsp;&nbsp;&nbsp;&nbsp;`v0.1.0`&nbsp;&nbsp;&nbsp;&nbsp;init


## License
Copyright (c) 2015 creeperyang. Licensed under the MIT license.