var app = require('./app');

switch (true) {

	// case /domain.com/.test(window.location.hostname):
	// 	app.config.environment = 'prod';
	// 	break;
default:
	app.config.environment = 'local';
	break;

}

module.exports = app.config.environment;