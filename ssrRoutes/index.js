const path = require('path');
const fs = require('fs');
const filePath = path.resolve('/home/deploy/mellocloud/public/index.html');

exports.home = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result;
    let title = 'mellocloud.com: Home of Dan Mello, Web Developer';
    let description = `"mellocloud.com is the home of Dan Mello a Front-End Developer from Boston, MA."`;

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

    let result;
    let title = 'mellocloud.com: Pdf web developement notes';
    let description = `"All my web developement notes in pdf format."`;

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(result);
  });
};

exports.resume = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result;
    let title = 'mellocloud.com: Dan Mello, Front-End Developer resume';
    let description = `"Dan Mello's resume. Front-End Developer from Boston, MA."`;

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(result);
  });
};

exports.contact = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result;
    let title = 'mellocloud.com: Contact';
    let description = `"mellocloud.com is the home of Dan Mello a Front-End Developer from Boston, MA."`;

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(result);
  });
};

exports.reactSimplerForms = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result;
    let title = 'mellocloud.com: react-simpler-forms';
    let description = `"react-simpler-forms, a React Higher Order component that manages all of your forms state along with other components that make it easy to create, validate, perform search queries, and submit single or multi-step forms."`;

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(result);
  });
};

exports.reactVideoPlayer = function (_, res) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    };

    let result;
    let title = 'mellocloud.com: react-video-player';
    let description = `"react-video-player, A React component for easily playing videos on mobile and desktop devices. Comes with video controls and customization for audio slider and video seekbar to match the theme of your website."`;

    data = data.replace(/\$OG_TITLE/g, title);
    result = data.replace(/\$OG_DESCRIPTION/g, description);
    res.send(result);
  });
};

exports.init = function (_, res) {
  res.sendFile(filePath);
};