var log,
	bunyan = require('bunyan'),
	config = require('./config.json');

module.exports = {
    initialize: function (name) {
    	if(!log) {
             console.log("initialize logger>>");
	    	 log = bunyan.createLogger({
			  name: config.logging.name + '-' + name,
			  serializers: {
			        req: bunyan.stdSerializers.req,
			        err: bunyan.stdSerializers.err
			   },
			  streams: [config.logging.streams]
			});

    	}
	},
    log: function (log) {

    	this.initialize(config.logging.name);
    	log.info(log);
    },
	info: function (log) {
    	this.initialize(config.logging.name);
    	log.info(log);
    },
    warn: function (log) {
    	this.initialize(config.logging.name);
    	log.warn(log);
    },
    error: function (log) {
    	this.initialize(config.logging.name);
    	log.error(log);
    },
    trace: function (log) {
    	this.initialize(config.logging.name);
    	log.trace(log);
    },
    debug: function (log) {
    	this.initialize(config.logging.name);
    	log.debug(log);
    }

}
