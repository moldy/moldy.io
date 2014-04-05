var app = require('../app');

module.exports = app.class.route.extend(function () {

}).methods({

	about: function (_req, _res) {
		_res.sendfile('./public/index.html');
	}

});