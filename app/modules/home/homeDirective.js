'use strict';

module.exports = function homeDirective() {
	return {
		controller: 'HomeViewCtrl',
		template: require('./home.html'),
		restrict: 'EA',
		scope: true
	};
};
