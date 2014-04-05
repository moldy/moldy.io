var app = require('../app');

module.exports = app.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		self.model.example = new app.model.example().model;
		self.model.guy = new app.model.guy().model;

		async.waterfall([

			function (_callback) {
				self.model.guy.$get(function (_error) {
					_callback(_error);
				});
			},

			function (_callback) {
				self.model.example.$get(function (_error) {
					_callback(_error);
				});
			}

		], function (_error) {
			if (_error) throw _error;
			self.initialised = true;
		});

	}

});