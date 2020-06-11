'use strict';

var suffixes = require('./data/suffix.json');

function normalizeValue(str) {
  return str
    .replace(/.+\/\/|\/.+|\s/g, '')
    .replace(/․/g, '.')
    .replace(/^\.|\.$/g, '')
    .toLowerCase();
}

function getTld(str) {
  if (str === '') {
    return '';
  }
  if (suffixes.indexOf(str) !== -1) {
    return str;
  }
  if (str.indexOf('.') !== -1) {
    return getTld(str.replace(/^[^.]+\./, ''));
  }
  return '';
}

function getSld(domain) {
  var array = domain.split('.');
  if (array.length === 0) {
    return '';
  }
  return array.shift();
}

function getDomain(str, tld) {
  var array = str.match(new RegExp('[^.]+\\.'.concat(tld, '$')));
  if (!array || array.length === 0) {
    return '';
  }
  return array.shift();
}

function getSubdomain(str, domain) {
  if (domain === '') {
    return '';
  }
  return str.replace(new RegExp('\\.?'.concat(domain, '$')), '');
}

var protos = {
  isTld: function () {
    return Boolean(this.tld && !this.sld);
  },
  isDomain: function () {
    return Boolean(this.tld && this.sld && !this.subdomain);
  },
  isSubdomain: function () {
    return Boolean(this.subdomain);
  },
  isDomainOrSubdomain: function () {
    return this.isDomain() || this.isSubdomain();
  },
};

function parse(input) {
  var result = Object.create(protos);
  result.input = input;
  result.tld = '';
  result.sld = '';
  result.output = '';
  result.domain = '';
  result.subdomain = '';

  if (typeof input !== 'string') {
    return result;
  }

  result.output = normalizeValue(result.input);
  result.tld = getTld(result.output);
  result.domain = getDomain(result.output, result.tld);
  result.sld = getSld(result.domain);
  result.subdomain = getSubdomain(result.output, result.domain);

  return result;
}

function includesTld(input, param) {
  if (typeof input !== 'string') {
    return result;
  }

  var output = normalizeValue(input);
  var tld = getTld(output);

  if (!param) {
    return Boolean(tld);
  }
  if (param instanceof Array) {
    if (param.length === 0) {
      return Boolean(tld);
    }
    return param.indexOf(tld) !== -1;
  }
  return param === tld;
}

module.exports.parse = parse;
module.exports.includesTld = includesTld;
module.exports.normalizeValue = normalizeValue;
