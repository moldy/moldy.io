var app = require('../app');

module.exports = app.class.route.extend(function () {

}).methods({

	get: function (_req, _res) {
		var data = new app.model.guy().model;
		data.name = 'David';
		_res.json(data.$json());
	},

	schema: function (_req, _res) {
		_res.json(require('../models/guy.model.json'));
	}

});