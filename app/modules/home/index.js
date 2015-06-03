'use strict';
module.exports = angular.module('com.intelirik.leanmotors.modules.home', [])
	.directive('homeView', require('./homeDirective'))
	.controller('HomeViewCtrl', require('./HomeController'))
	.config(require('./routes'));