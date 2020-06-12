# nameamparser


## Installation

Using npm:

```js
npm install --save nameamparser
```

## nameamparser API

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
