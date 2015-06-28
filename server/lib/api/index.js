'use strict';
var apiHandlers = {
	products: './products',
	dashboard: './dashboard'

};


module.exports = {
    initialize: function (server) {
        Object.keys(apiHandlers).forEach(function (key) {
             console.log('>>/api/ + key>>', '/api/' + key);
        	server.use('/api/' + key, require(apiHandlers[key]));
        });
    }
};