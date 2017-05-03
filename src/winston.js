"use strict";

var config = require('./config'),
	fs = require('fs'),
	path = require('path'),
	winston = require('winston');

var logger = new (winston.Logger)();

logger.add(winston.transports.Console, {
	level: config.log.level,
	prettyPrint: true,
	colorize: true,
	silent: false,
	timestamp: false
});

logger.stream = {
	write: function (message, encoding) {
		logger.info(message);
	}
};

module.exports = logger;