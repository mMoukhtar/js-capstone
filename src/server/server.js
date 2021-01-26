/* SERVER.JS */
// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import dotevn from 'dotenv';
import router from './Routers/routers.js';
import chalk from 'chalk';

// Setup Express App
const app = express();

//Get access to .env
dotevn.config();
const port = process.env.port;

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
