/* SERVER.JS */
// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const router = require('./Routers/routers.js');
const chalk = require('chalk');
var dotenv = require('dotenv');
dotenv.config();

// Setup Express App
const app = express();

//Get access to .env
const port = process.env.PORT || 8080;

// Middleware dep.
app.use(compression());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Routers
app.use('/', router);
app.use((req, res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

// Spin Server
app.listen(port, () => {
  console.log(chalk.green('Express Server is running...'));
  console.log(chalk.green(`Server is running on: http://localhost:${port}`));
});
