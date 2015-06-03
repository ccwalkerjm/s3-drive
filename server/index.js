// /http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
'use strict';
var express = require('express'),
	url = require('url'),
	proxy = require('proxy-middleware'),
	bodyParser = require('body-parser'),
  logger = require('./config/logger'),
  config = require('./config/config.json'),
  path = require('path');
var API_URL = process.env.API_URL || 'http://localhost:3000/';

var server = express();

server.set('port', (process.env.PORT || 5000));

// process.env.API_URL is an environment variable set on Heroku
/*server.use('/api', proxy(url.parse(API_URL)));*/

server.use(express.static('./../dist'));
server.all('/*', function(req, res, next) {
  console.log('>>>>>>new requests>>');
   //req.log = logger;
	// CORS headers
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  	// Set custom headers for CORS
  	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	  if (req.method == 'OPTIONS') {
	    res.status(200).end();
	  } else {
	    next();
	  }

    var rootPath = path.join(__dirname, './../dist/');
    console.log('rootPath', rootPath);
    res.sendFile('/', { root: path.join(__dirname, './../dist/') });
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
//server.all('/api/v1/*', [require('./lib/middlewares/validateRequest')]);

var api = require('./lib/api');
api.initialize(server);

/*server.use('/api/', require('./lib/api'));*/

// If no route is matched by now, it must be a 404
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = {
    start: function () {
      server.listen(server.get('port'), function() {
    			console.log("Node app is running at localhost:>>" + server.get('port'));
  		});
    },
    port: server.get('port'),
    use: function (config) {
    	server.use(config);
    },
    shutdown: function () {
    }
};
