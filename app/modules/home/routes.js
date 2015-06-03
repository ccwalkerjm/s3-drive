'use strict';
function routes($stateProvider) {

    var state = {
        name: 'home',
        url: '/',
        template: '<div home-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'home',
            pageTitle: 'Home',
            pageDescription: 'Meta Description goes here'
        }
    };
    $stateProvider.state(state);
}

routes.$inject = ['$stateProvider'];
module.exports = routes;