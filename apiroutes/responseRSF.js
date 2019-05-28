exports.init = function (req, res) {
  let name = req.body.name || req.body['first_name'];
  return res.send('Thank you ' + name + ' for trying react-simpler-forms v1.0.2!');
};