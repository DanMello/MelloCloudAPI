const path = require('path');
const fs = require('fs');
const filePath = path.resolve('/home/deploy/mellocloud/public/index.html');

exports.home = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result
    let title = 'mellocloud.com: Home of Dan Mello, Web Developer.'
    let description = `"mellocloud.com is the home of Dan Mello a Front-End Developer from Boston, MA."`

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);

    res.send(result);
  });
};

exports.notes = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) { 
    if (err) {
      return console.log(err);
    };
    let newData = data
    newData = newData.replace(/\$OG_TITLE/g, "Notes Page");
    newData = newData.replace(/\$OG_DESCRIPTION/g, "This is the description notes");
    res.send(newData);
  });
};

exports.init = function (_, res) {
  res.sendFile(filePath);
};