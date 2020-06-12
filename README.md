# nameamparser


## Installation

Using npm:

```js
npm install --save nameamparser
```

## API

##### parse(domain)

```js
const nmparser = require('nameamparser');
const parsed = nmparser.parse('https://wwW.name.AM');

console.log(parsed.output); // 'www.name.am'
console.log(parsed.tld); // 'am'
console.log(parsed.sld); // 'name'
console.log(parsed.domain); // 'name.am'
console.log(parsed.subdomain); // 'www'

```

##### includesTld(domain[, tld])


```js
const nmparser = require('nameamparser');

console.log(nmparser.includesTld('name.am')); // true
console.log(nmparser.includesTld('name.am', 'com')); // false
console.log(nmparser.includesTld('name.am', ['com', 'am'])); // true

```

## License

MIT License

Copyright (c) 2020 Tigran Simonyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
