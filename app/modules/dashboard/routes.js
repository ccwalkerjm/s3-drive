'use strict';
function routes($stateProvider) {
    var state = {
        name: 'dashboard',
        url: '/dashboard',
        template: '<div dashboard-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'dashboard',
            pageTitle: 'Dashboard',
            pageDescription: 'Meta Description goes here'
        }
    };
    $stateProvider.state(state);
}

routes.$inject = ['$stateProvider'];
module.exports = routes;