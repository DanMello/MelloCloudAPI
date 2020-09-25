const path = require('path');
const fs = require('fs');
const filePath = path.resolve('/home/deploy/mellocloud/automotiveshield/index.html');

exports.automotiveShield = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    // let result;
    // let title = 'mellocloud.com: Automotive Shield';
    // let description = `"Automotive Shield website"`;

    // data = data.replace(/\$OG_TITLE/g, title);
    // result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(data);
  });
};