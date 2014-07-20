/*global console, __dirname */

(function() {
	"use strict";

	var logfmt = require('logfmt');
	var express = require("express");
	var app = express();

	var port = process.env.PORT || 5000;

	app.use(logfmt.requestLogger());

	app.use(express.static(__dirname + '/public'));

	app.listen(port, function() {
		console.log('Starting server at port: ', port);
	});

}());
