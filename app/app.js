'use strict';

require('angular');
module.exports = angular.module('com.intelirik.leanmotors',
	[
		require('./common').name,
		require('./modules').name
	])
	.config(require('./appConfig'))
	.constant('version', require('../package.json').version)
	.run(require('./common/common-init.js'));