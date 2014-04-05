var app = require('../app');

module.exports = app.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		self.initialised = true;
	}

});