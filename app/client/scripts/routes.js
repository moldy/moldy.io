var app = require('./app');

var controller = function (_service) {
	return function () {
		var self = app.scope.self = app.self = app.controller[_service];

		self.name = _service;
		self.initialised = false;
		self.init();
	};
};

module.exports = function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/about', {
		templateUrl: '/partials/about.html',
		controller: controller('aboutService')
	})

	.otherwise({
		templateUrl: 'partials/main.html',
		controller: controller('mainService')
	});

	$locationProvider.html5Mode(true);

};