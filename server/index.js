
'use strict';
var express = require('express'),
	server = express(),
	url = require('url'),
	proxy = require('proxy-middleware'),
	bodyParser = require('body-parser'),
	logger = require('./config/logger'),
	config = require('./config/config.json'),
	path = require('path');
var API_URL = process.env.API_URL || 'http://localhost:3000/';

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, '../dist')));

var api = require('./lib/api');
api.initialize(server); 

server.get('*', function(req, res) {
	// CORS headers
   	res.header('Access-Control-Allow-Origin', '*');
   	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   	// Set custom headers for CORS
   	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
 	 

	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// If no route is matched by now, it must be a 404
// server.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
     
server.listen(server.get('port'), function() {
  console.log("Node app is running at localhost:" + server.get('port'));
});
