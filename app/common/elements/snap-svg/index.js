'use strict';

module.exports = angular.module('common.elements.snapSVG', [])
	.directive('snapSVG', function () {
		return {
			template: require('./snap-svg.html'),
			restrict: 'E',
			replace: true
		};
	});