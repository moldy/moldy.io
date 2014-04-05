var app = require('../app');

exports.apply = function () {
	app.scope.$apply();
};