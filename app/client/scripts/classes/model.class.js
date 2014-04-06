var app = require('../app');

module.exports = app.class.base.extend(function () {

}).methods({

	addListeners: function () {
		var self = this,
			cb = function (_method) {
				return function () {
					self[_method].apply(self, arguments);
				}
			};
		this.model.on('preget', cb('preget'));
		this.model.on('get', cb('get'));
		this.model.on('presave', cb('presave'));
		this.model.on('save', cb('save'));
		this.model.on('predestroy', cb('predestroy'));
		this.model.on('destroy', cb('destroy'));
	},

	predestroy: function () {},
	preget: function () {},
	presave: function () {},

	collection: function () {
		app.helpers.scope.apply();
	},

	destroy: function () {
		app.helpers.scope.apply();
	},

	get: function () {
		app.helpers.scope.apply();
	},

	save: function () {
		app.helpers.scope.apply();
	}

});