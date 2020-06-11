var https = require('https');
var fs = require('fs');

function getData(url) {
  return new Promise(function (resolve, reject) {
    https
      .get(url, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
          data += chunk;
        });
        resp.on('end', function () {
          resolve(data);
        });
      })
      .on('error', reject);
  });
}

getData('https://publicsuffix.org/list/public_suffix_list.dat')
  .then(function (result) {
    var list = result.replace(/(\*\.|\!|\/\/.*)/g, '');
    var array = list.split(/\n/).filter(Boolean);
    var data = JSON.stringify(array, null, 2);
    fs.writeFileSync('./data/suffix.json', data);
  })
  .catch(function (error) {
    console.error(error);
  });
