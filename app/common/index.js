window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');

module.exports = angular.module('com.intelirik.leanmotors.common',
	[
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'restangular',
        require('./elements/header').name,
        require('./elements/footer').name,
        require('./elements/snap-svg').name,
        require('./directives').name,
        require('./resources').name,
        require('./services').name
	]);