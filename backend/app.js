const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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

module.exports = app;