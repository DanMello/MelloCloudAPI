exports.init = function(err, _, res) {
  if (err.status === 400) {
    return res.status(400).send(err.message);
  } else {
    return res.status(500).send(err.message);
  };
};