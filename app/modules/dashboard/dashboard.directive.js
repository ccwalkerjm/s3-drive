'use strict';

module.exports = function DashboardDirective() {
	return {
		controller: 'DashboardCtrl',
		template: require('./dashboard.html'),
		restrict: 'EA',
		scope: true
	};
};