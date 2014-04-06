var app = require('./app');

module.exports = function (_app) {
	var app = _app,
		example = new(require('./routes/example.route'))(),
		guy = new(require('./routes/guy.route'))(),
		website = new(require('./routes/website.route'))();


	/**
	 * Website
	 */
	app.get('/about', website.about);

	/**
	 * API
	 */

	/* Example */
	app.get('/api/example', example.get);
	app.get('/api/example/schema', example.schema);

	/* Guy */
	app.get('/api/guy', guy.get);
	app.get('/api/guy/schema', guy.schema);

}