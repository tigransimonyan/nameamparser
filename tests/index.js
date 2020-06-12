'use strict';

var nmparser = require('../');

function check(value, condition) {
  if (condition) {
    console.log('\x1b[32m%s\x1b[0m', 'success:', value.input);
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'error:', value.input);
  }
}

var str1 = nmparser.parse('https://www.name.Am/?lng=en ');

check(
  str1,
  str1.tld === 'am' &&
    str1.sld === 'name' &&
    str1.subdomain === 'www' &&
    str1.output === 'www.name.am' &&
    str1.isDomainOrSubdomain() === true &&
    str1.isSubdomain() === true &&
    str1.isDomain() === false &&
    str1.isTld() === false
);

var str2 = nmparser.parse('test.test.test?');

check(
  str2,
  str2.tld === '' &&
    str2.subdomain === '' &&
    str2.sld === 'testtesttest' &&
    str2.output === 'test.test.test' &&
    str2.isDomainOrSubdomain() === false &&
    str2.isSubdomain() === false &&
    str2.isDomain() === false &&
    str2.isTld() === false
);
