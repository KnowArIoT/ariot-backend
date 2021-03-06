const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const index = require('./routes/index');
const app = express();

const corsOptions = {
  origin: 'https://dashboard.thuc.cloud',
  optionsSuccessStatus: 200
};

app.use(helmet({
  noCache: true,
  hidePoweredBy: true,
  referrerPolicy: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cors(corsOptions));
app.use(cors());

app.use('/', index);

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    code: err.code,
    message: err.message
  });
});

module.exports = app;
