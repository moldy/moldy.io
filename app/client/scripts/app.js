var app = exports;

/* Core */
app.class = {};
app.config = require('./config.json');
app.controller = null;
app.environment = require('./environment');
app.helpers = require('./helpers');
app.model = {};
app.modules = require('./modules');
app.routes = require('./routes');
app.scope = null;
app.self = null;
app.service = {};

/* Classes */
app.class.base = require('./classes/base.class');
app.class.model = require('./classes/model.class');
app.class.service = require('./classes/service.class');

/* Services */
app.service.main = require('./services/main.service');
app.service.about = require('./services/about.service');

/* Models */
app.model.example = require('./models/example.model');
app.model.guy = require('./models/guy.model');

/* Middleware */
app.modules.moldy.use(app.modules.moldy.schema);
app.modules.moldy.use(app.modules.moldy.ajax);