var app = require('../app');

module.exports = app.class.model.extend(function () {

	this.model = new app.modules.moldy('example', require('./example.model.json'));

});