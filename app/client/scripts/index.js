var app = require('./app');

exports = module.exports = app;
angular.module('app', ['ngRoute']).config(app.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var controller = app.controller = this;

	app.scope = $scope;
	app.scope.$route = $route;
	app.scope.$routeParams = $routeParams;
	app.scope.$location = $location;

	/* Dependencies */
	// app.scope.moment = moment;

	Object.keys(app.service).forEach(function (_key) {
		controller[_key + 'Service'] = new app.service[_key]();
	});

};