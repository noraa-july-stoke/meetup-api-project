const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

/*Enable CORS in development */
if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

/*Set CSRF token */
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'lax',
            httpOnly: true
        }
    })
);

app.use(routes);

/* Error handling middleware section */


/* Generic resource not found (404) error
   Note that this only generates an error,
   and does not accept incoming errors. */
app.use((_req, _res, next) => {
    const err = new Error('The requested resource couldn\'t be found');
    err.title = 'Resource not found';
    err.errors = ['The requested resource couldn\'t be found'];
    err.status = 404;
    next(err);
});

/* Sequelize error, note that this both
   takes in and sends an error */

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err)
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});


module.exports = app;
