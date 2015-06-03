// These routes are to define any app-level paths to modules.
// For module-level route definitions, use the Routes.js files found in the module folders.

'use strict';

function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
}


appRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
module.exports = appRoutes;

