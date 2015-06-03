'use strict';
module.exports = angular.module('com.intelirik.leanmotors.modules.dashboard', [])
	.directive('dashboardView', require('./dashboard.directive.js'))
	.controller('DashboardCtrl', require('./dashboard.controller.js'))
    .config(require('./routes'));

