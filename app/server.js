'use strict';

/**
 * Module dependencies.
 */
var chalk = require('chalk'),
    config = require('./config'),
    express = require('./express'),
    winston = require('./winston');


module.exports.init = function init(callback) {
    var app = express.init();
    callback(app, config);
};

module.exports.start = function start(callback) {
    winston.info('Initializing 77media Verification Service Sample...');

    var _this = this;

    _this.init(function (app, config) {

        // Start the app by listening on <port>
        app.listen(config.port, function () {

            // Logging initialization
            console.log('--------------------------');
            console.log(chalk.green('Environment:\t\t') + process.env.NODE_ENV);
            console.log(chalk.green('Port:\t\t\t') + config.port);

            console.info(chalk.green('App URL:\t\t') + (process.env.NODE_HOST || 'localhost') + ":" + config.port);

            console.log('--------------------------');

            if (callback) callback(app, config);
        });
    });
};