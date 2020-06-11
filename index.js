'use strict';

var suffixes = require('./data/suffix.json');

function isArray(x) {
  return x && x.constructor.toString().indexOf('Array') > -1;
}

function normalizeValue(str) {
  return str
    .replace(/\s/g, '')
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
  includesTld: function (value) {
    return isArray(value) ? value.indexOf(this.tld) !== -1 : value === this.tld;
  },
};

function parse(str) {
  var result = new Object(protos);
  result.input = str;
  result.tld = '';
  result.sld = '';
  result.domain = '';
  result.subdomain = '';

  if (typeof str !== 'string') {
    return result;
  }

  var value = normalizeValue(str);
  result.tld = getTld(value);
  result.domain = getDomain(value, result.tld);
  result.subdomain = getSubdomain(value, result.domain);
  result.sld = getSld(result.domain);
  return result;
}

module.exports = parse;
