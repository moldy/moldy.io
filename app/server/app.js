var app = exports;

/* Core */
app.class = {};
app.config = require('./config.json');
app.environment = require('./environment');
app.helpers = require('./helpers');
app.model = {};
app.modules = require('./modules');

/* Classes */
app.class.base = require('./classes/base.class');
app.class.model = require('./classes/model.class');
app.class.route = require('./classes/route.class');

/* Models */
app.model.example = require('./models/example.model');
app.model.guy = require('./models/guy.model');