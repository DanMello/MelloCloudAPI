const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(express.static('public'));
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('./routes')(app);

app.use(require('./routes/errorHandler').init);
app.listen(3001);