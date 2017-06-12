'use strict';

/**
 * Module dependencies.
 */
var config = require('./config'),
    bodyParser = require('body-parser'),
    express = require('express'),
    fs = require('fs'),
    http = require('http'),
    methodOverride = require('method-override'),
    path = require('path'),
    winston = require('./winston');

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
    winston.info('Initializing Middleware...');

    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());


};

/**
 * Configure the modules server routes
 */
module.exports.initServerRoutes = function (app) {
    winston.info('Initializing Server Routes...');
    require('./routes')(app);
};

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
    winston.info('Initializing Error Routes...');
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {
            return next();
        }

        // Log it
        console.error(err.stack);
        // Redirect to error page
        return res.json(err.stack);
    });
};

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
    // Initialize express app
    var app = express();

    app.use(function (req, res, next) {
        if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }
        else {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
        }
        next();
    });

    app.set('etag', 'strong');

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize server routes
    this.initServerRoutes(app);

    // Initialize error routes
    this.initErrorRoutes(app);

    return app;
};