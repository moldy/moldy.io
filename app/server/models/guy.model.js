var app = require('../app');

module.exports = app.class.model.extend(function () {

	this.model = new app.modules.moldy('guy', require('./guy.model.json'));

});