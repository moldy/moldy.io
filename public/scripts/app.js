!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.app=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var app = exports;

/* Core */
app.class = {};
app.config = _dereq_('./config.json');
app.controller = null;
app.environment = _dereq_('./environment');
app.helpers = _dereq_('./helpers');
app.model = {};
app.modules = _dereq_('./modules');
app.routes = _dereq_('./routes');
app.scope = null;
app.self = null;
app.service = {};

/* Classes */
app.class.base = _dereq_('./classes/base.class');
app.class.model = _dereq_('./classes/model.class');
app.class.service = _dereq_('./classes/service.class');

/* Services */
app.service.main = _dereq_('./services/main.service');
app.service.about = _dereq_('./services/about.service');

/* Models */
app.model.example = _dereq_('./models/example.model');
app.model.guy = _dereq_('./models/guy.model');

/* Middleware */
app.modules.moldy.use(app.modules.moldy.schema);
app.modules.moldy.use(app.modules.moldy.ajax);
},{"./classes/base.class":2,"./classes/model.class":3,"./classes/service.class":4,"./config.json":5,"./environment":6,"./helpers":8,"./models/example.model":10,"./models/guy.model":11,"./modules":12,"./routes":13,"./services/about.service":14,"./services/main.service":15}],2:[function(_dereq_,module,exports){
var app = _dereq_('../app');

module.exports = app.modules.klass(function () {});
},{"../app":1}],3:[function(_dereq_,module,exports){
var app = _dereq_('../app');

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
},{"../app":1}],4:[function(_dereq_,module,exports){
var app = _dereq_('../app');

module.exports = app.class.base.extend(function () {
	this.model = {};
});
},{"../app":1}],5:[function(_dereq_,module,exports){
module.exports={
	"api": {
		"base": "/api"
	}
}
},{}],6:[function(_dereq_,module,exports){
var app = _dereq_('./app');

switch (true) {

	// case /domain.com/.test(window.location.hostname):
	// 	app.config.environment = 'prod';
	// 	break;
default:
	app.config.environment = 'local';
	break;

}

module.exports = app.config.environment;
},{"./app":1}],7:[function(_dereq_,module,exports){
var app = _dereq_('./app');

exports = module.exports = app;
angular.module('app', ['ngRoute']).config(app.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var controller = app.controller = this;

	app.scope = $scope;
	app.scope.$route = $route;
	app.scope.$routeParams = $routeParams;
	app.scope.$location = $location;

	/* Dependencies */
	// app.scope.moment = moment;

	Object.keys(app.service).forEach(function (_key) {
		controller[_key + 'Service'] = new app.service[_key]();
	});

};
},{"./app":1}],8:[function(_dereq_,module,exports){
module.exports = {
	scope: _dereq_('./scope')
};
},{"./scope":9}],9:[function(_dereq_,module,exports){
var app = _dereq_('../app');

exports.apply = function () {
	app.scope.$apply();
};
},{"../app":1}],10:[function(_dereq_,module,exports){
var app = _dereq_('../app');

module.exports = app.class.model.extend(function () {

	this.model = new app.modules.moldy('example', {
		baseUrl: app.config.api.base
	});

	this.addListeners();

});
},{"../app":1}],11:[function(_dereq_,module,exports){
var app = _dereq_('../app');

module.exports = app.class.model.extend(function () {

	this.model = new app.modules.moldy('guy', {
		baseUrl: app.config.api.base
	});

	this.addListeners();

});
},{"../app":1}],12:[function(_dereq_,module,exports){
exports = module.exports = {
	klass: _dereq_('klass'),
	moldy: _dereq_('moldy')
};
},{"klass":16,"moldy":26}],13:[function(_dereq_,module,exports){
var app = _dereq_('./app');

var controller = function (_service) {
	return function () {
		var self = app.scope.self = app.self = app.controller[_service];

		self.name = _service;
		self.initialised = false;
		self.init();
	};
};

module.exports = function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/about', {
		templateUrl: '/partials/about.html',
		controller: controller('aboutService')
	})

	.otherwise({
		templateUrl: 'partials/main.html',
		controller: controller('mainService')
	});

	$locationProvider.html5Mode(true);

};
},{"./app":1}],14:[function(_dereq_,module,exports){
var app = _dereq_('../app');

module.exports = app.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		self.initialised = true;
	}

});
},{"../app":1}],15:[function(_dereq_,module,exports){
var app = _dereq_('../app');

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
},{"../app":1}],16:[function(_dereq_,module,exports){
/*!
  * klass: a classical JS OOP façade
  * https://github.com/ded/klass
  * License MIT (c) Dustin Diaz 2014
  */

!function (name, context, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else context[name] = definition()
}('klass', this, function () {
  var context = this
    , f = 'function'
    , fnTest = /xyz/.test(function () {xyz}) ? /\bsupr\b/ : /.*/
    , proto = 'prototype'

  function klass(o) {
    return extend.call(isFn(o) ? o : function () {}, o, 1)
  }

  function isFn(o) {
    return typeof o === f
  }

  function wrap(k, fn, supr) {
    return function () {
      var tmp = this.supr
      this.supr = supr[proto][k]
      var undef = {}.fabricatedUndefined
      var ret = undef
      try {
        ret = fn.apply(this, arguments)
      } finally {
        this.supr = tmp
      }
      return ret
    }
  }

  function process(what, o, supr) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        what[k] = isFn(o[k])
          && isFn(supr[proto][k])
          && fnTest.test(o[k])
          ? wrap(k, o[k], supr) : o[k]
      }
    }
  }

  function extend(o, fromSub) {
    // must redefine noop each time so it doesn't inherit from previous arbitrary classes
    function noop() {}
    noop[proto] = this[proto]
    var supr = this
      , prototype = new noop()
      , isFunction = isFn(o)
      , _constructor = isFunction ? o : this
      , _methods = isFunction ? {} : o
    function fn() {
      if (this.initialize) this.initialize.apply(this, arguments)
      else {
        fromSub || isFunction && supr.apply(this, arguments)
        _constructor.apply(this, arguments)
      }
    }

    fn.methods = function (o) {
      process(prototype, o, supr)
      fn[proto] = prototype
      return this
    }

    fn.methods.call(fn, _methods).prototype.constructor = fn

    fn.extend = arguments.callee
    fn[proto].implement = fn.statics = function (o, optFn) {
      o = typeof o == 'string' ? (function () {
        var obj = {}
        obj[o] = optFn
        return obj
      }()) : o
      process(this, o, supr)
      return this
    }

    return fn
  }

  return klass
});

},{}],17:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],18:[function(_dereq_,module,exports){
var contains = _dereq_( "sc-contains" ),
  is = _dereq_( "sc-is" );

var cast = function ( _value, _castType, _default, _values, _additionalProperties ) {

  var parsedValue,
    castType = _castType,
    value,
    values = is.an.array( _values ) ? _values : [];

  switch ( true ) {
  case ( /float|integer/.test( castType ) ):
    castType = "number";
    break;
  }

  if ( is.a[ castType ]( _value ) || castType === '*' ) {

    value = _value;

  } else {

    switch ( true ) {

    case castType === "array":

      try {
        if ( is.a.string( _value ) ) {
          value = JSON.parse( _value );
        }
        if ( is.not.an.array( value ) ) {
          throw "";
        }
      } catch ( e ) {
        if ( is.not.nullOrUndefined( _value ) ) {
          value = [ _value ];
        }
      }
      break;

    case castType === "boolean":

      try {
        value = /^(true|1|y|yes)$/i.test( _value.toString() ) ? true : undefined;
      } catch ( e ) {}

      if ( is.not.a.boolean( value ) ) {

        try {
          value = /^(false|-1|0|n|no)$/i.test( _value.toString() ) ? false : undefined;
        } catch ( e ) {}

      }

      value = is.a.boolean( value ) ? value : undefined;

      break;

    case castType === "date":

      try {

        value = new Date( _value );
        value = isNaN( value.getTime() ) ? undefined : value;

      } catch ( e ) {}

      break;

    case castType === "string":

      try {

        value = JSON.stringify( _value );
        if ( is.undefined( value ) ) {
          throw "";
        }

      } catch ( e ) {

        try {
          value = _value.toString()
        } catch ( e ) {}

      }

      break;

    case castType === "number":

      try {
        value = parseFloat( _value );
        if ( is.not.a.number( value ) || isNaN( value ) ) {
          value = undefined;
        }
      } catch ( e ) {
        value = undefined
      }

      if ( value !== undefined ) {
        switch ( true ) {
        case _castType === "integer":
          value = parseInt( value );
          break;
        }
      }

      break;

    default:

      try {
        value = cast( JSON.parse( _value ), castType )
      } catch ( e ) {}

      break;

    }

  }

  if ( values.length > 0 && !contains( values, value ) ) {
    value = values[ 0 ];
  }

  return is.not.undefined( value ) ? value : is.not.undefined( _default ) ? _default : null;

};

module.exports = cast;
},{"sc-contains":19,"sc-is":32}],19:[function(_dereq_,module,exports){
var contains = function ( data, item ) {
  var foundOne = false;

  if ( Array.isArray( data ) ) {

    data.forEach( function ( arrayItem ) {
      if ( foundOne === false && item === arrayItem ) {
        foundOne = true;
      }
    } );

  } else if ( Object( data ) === data ) {

    Object.keys( data ).forEach( function ( key ) {

      if ( foundOne === false && data[ key ] === item ) {
        foundOne = true;
      }

    } );

  }
  return foundOne;
};

module.exports = contains;
},{}],20:[function(_dereq_,module,exports){
var type = _dereq_( "type-component" );

var merge = function () {

  var args = Array.prototype.slice.call( arguments ),
    deep = type( args[ 0 ] ) === "boolean" ? args.shift() : false,
    objects = args,
    result = {};

  objects.forEach( function ( objectn ) {

    if ( type( objectn ) !== "object" ) {
      return;
    }

    Object.keys( objectn ).forEach( function ( key ) {
      if ( Object.prototype.hasOwnProperty.call( objectn, key ) ) {
        if ( deep && type( objectn[ key ] ) === "object" ) {
          result[ key ] = merge( deep, {}, result[ key ], objectn[ key ] );
        } else {
          result[ key ] = objectn[ key ];
        }
      }
    } );

  } );

  return result;
};

module.exports = merge;
},{"type-component":21}],21:[function(_dereq_,module,exports){

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val === Object(val)) return 'object';

  return typeof val;
};

},{}],22:[function(_dereq_,module,exports){
module.exports={
	"defaults": {
		"middlewareKey": "all"
	}
}
},{}],23:[function(_dereq_,module,exports){
var is = _dereq_( "sc-is" ),
  config = _dereq_( "./config.json" ),
  noop = function () {};

var useifyFunction = function ( functions, key, fn ) {
  if ( is.not.empty( key ) && is.a.string( key ) ) {
    if ( is.not.an.array( functions[ key ] ) ) {
      functions[ key ] = [];
    }
    if ( is.a.func( fn ) ) {
      functions[ key ].push( fn );
    }
    return functions[ key ];
  }
}

var Useify = function () {
  this.functions = {
    all: []
  };
};

Useify.prototype.use = function () {
  var self = this,
    args = Array.prototype.slice.call( arguments ),
    key = is.a.string( args[ 0 ] ) ? args.shift() : config.defaults.middlewareKey,
    fn = is.a.func( args[ 0 ] ) ? args.shift() : noop;

  useifyFunction( self.functions, key, fn );
};

Useify.prototype.middleware = function () {

  var self = this,
    currentFunction = 0,
    args = Array.prototype.slice.call( arguments ),
    middlewareKey = is.a.string( args[ 0 ] ) && is.a.func( args[ 1 ] ) ? args.shift() : config.defaults.middlewareKey,
    callback = is.a.func( args[ 0 ] ) ? args.shift() : noop;

  useifyFunction( self.functions, middlewareKey );

  var next = function () {
    var fn = self.functions[ middlewareKey ][ currentFunction++ ],
      args = Array.prototype.slice.call( arguments );

    if ( !fn ) {
      callback.apply( self.context, args );
    } else {
      args.push( next );
      fn.apply( self.context, args );
    }

  };

  next.apply( self.context, args );

};

Useify.prototype.clear = function ( middlewareKey ) {
  if ( is.a.string( middlewareKey ) && is.not.empty( middlewareKey ) ) {
    this.functions[ middlewareKey ] = [];
  } else {
    this.functions = {
      all: []
    };
  }
};

module.exports = function ( _objectOrFunction ) {

  var useify = new Useify();

  if ( is.an.object( _objectOrFunction ) ) {

    Object.defineProperties( _objectOrFunction, {

      "use": {
        value: function () {
          useify.use.apply( useify, arguments );
          return _objectOrFunction;
        }
      },

      "middleware": {
        value: function () {
          useify.middleware.apply( useify, arguments );
        }
      },

      "useify": {
        value: useify
      }

    } );

    useify.context = _objectOrFunction;

  } else if ( is.a.fn( _objectOrFunction ) ) {

    _objectOrFunction.prototype.middleware = function () {
      useify.context = this;
      useify.middleware.apply( useify, arguments );
    };

    _objectOrFunction.use = function () {
      useify.use.apply( useify, arguments );
      return this;
    };

    _objectOrFunction.useify = useify;

  }

};
},{"./config.json":22,"sc-is":32}],24:[function(_dereq_,module,exports){
var ObservableArray = function ( _array ) {
	var handlers = {},
		array = Array.isArray( _array ) ? _array : [];

	var proxy = function ( _method, _value ) {
		var args = Array.prototype.slice.call( arguments, 1 );

		if ( handlers[ _method ] ) {
			return handlers[ _method ].apply( array, args );
		} else {
			return array[ '__' + _method ].apply( array, args );
		}
	};

	Object.defineProperties( array, {
		on: {
			value: function ( _event, _callback ) {
				handlers[ _event ] = _callback;
			}
		}
	} );

	Object.defineProperty( array, 'pop', {
		value: function () {
			return proxy( 'pop', array[ array.length - 1 ] );
		}
	} );

	Object.defineProperty( array, '__pop', {
		value: function () {
			return Array.prototype.pop.apply( array, arguments );
		}
	} );

	Object.defineProperty( array, 'shift', {
		value: function () {
			return proxy( 'shift', array[ 0 ] );
		}
	} );

	Object.defineProperty( array, '__shift', {
		value: function () {
			return Array.prototype.shift.apply( array, arguments );
		}
	} );

	[ 'push', 'reverse', 'unshift', 'sort', 'splice' ].forEach( function ( _method ) {
		var properties = {};

		properties[ _method ] = {
			value: proxy.bind( null, _method )
		};

		properties[ '__' + _method ] = {
			value: function ( _value ) {
				return Array.prototype[ _method ].apply( array, arguments );
			}
		};

		Object.defineProperties( array, properties );
	} );

	return array;
};

module.exports = ObservableArray;
},{}],25:[function(_dereq_,module,exports){
var is = _dereq_( 'sc-is' ),
	cast = _dereq_( 'sc-cast' ),
	merge = _dereq_( 'sc-merge' );

exports.attributes = function ( _key, _value ) {
	var value;

	if ( is.a.string( _value ) ) {
		value = {
			type: _value
		};
	} else if ( is.an.object( _value ) && _value[ '__model' ] === true ) {
		value = {
			type: 'model',
			default: _value
		}
	} else {
		value = _value;
	}

	return merge( {
		name: _key || '',
		type: '',
		default: null,
		optional: false
	}, value );
};

exports.getProperty = function ( _key ) {
	return function () {
		return this.__data[ _key ];
	}
};

exports.setBusy = function ( _self ) {
	return function () {
		_self.busy = true;
	}
};

exports.setProperty = function ( _key ) {
	return function ( _value ) {
		var self = this,
			attributes = self.__attributes[ _key ],
			value = attributes.type ? cast( _value, attributes.type, attributes[ 'default' ] ) : _value;

		if ( self.__data[ _key ] !== value ) {
			self.emit( 'change', self.__data[ _key ], value );
		}

		self.__data[ _key ] = value;
	}
};

exports.unsetBusy = function ( _self ) {
	return function () {
		_self.busy = false;
	}
};

exports.noop = function () {};
},{"sc-cast":18,"sc-is":32,"sc-merge":20}],26:[function(_dereq_,module,exports){
var is = _dereq_( 'sc-is' ),
	cast = _dereq_( 'sc-cast' ),
	hasKey = _dereq_( 'sc-haskey' ),
	helpers = _dereq_( './helpers' ),
	merge = _dereq_( 'sc-merge' ),
	emitter = _dereq_( 'emitter-component' ),
	useify = _dereq_( 'sc-useify' ),
	request = _dereq_( './request' ),
	observableArray = _dereq_( 'sg-observable-array' );

var Model = function ( _name, _properties ) {
	var self = this,
		properties = is.an.object( _properties ) ? _properties : {};

	Object.defineProperties( self, {
		__model: {
			value: true
		},
		__attributes: {
			value: {},
			writable: true
		},
		__baseUrl: {
			value: cast( properties[ 'baseUrl' ], 'string', '' ),
			writable: true
		},
		__data: {
			value: {},
			writable: true
		},
		__destroyed: {
			value: false,
			writable: true
		},
		__headers: {
			value: cast( properties[ 'headers' ], 'object', {} ),
			writable: true
		},
		__key: {
			value: cast( properties[ 'key' ], 'string', 'id' ) || 'id',
			writable: true
		},
		__keyless: {
			value: properties[ 'keyless' ] === true
		},
		__name: {
			value: _name || properties[ 'name' ] || ''
		},
		__url: {
			value: cast( properties[ 'url' ], 'string', '' ),
			writable: true
		},
		busy: {
			value: false,
			writable: true
		}
	} );

	if ( !properties[ 'keyless' ] ) {
		self.$property( self.__key );
	}

	Object.keys( cast( properties[ 'properties' ], 'object', {} ) ).forEach( function ( _key ) {
		self.$property( _key, properties[ 'properties' ][ _key ] );
	} );

	self.on( 'presave', helpers.setBusy( self ) );
	self.on( 'save', helpers.unsetBusy( self ) );

	self.on( 'predestroy', helpers.setBusy( self ) );
	self.on( 'destroy', helpers.unsetBusy( self ) );

	self.on( 'preget', helpers.setBusy( self ) );
	self.on( 'get', helpers.unsetBusy( self ) );

};

Model.prototype.$baseUrl = function ( _base ) {
	var self = this,
		url = cast( _base, 'string', self.__baseUrl || '' );

	self.__baseUrl = url.trim().replace( /(\/|\s)+$/g, '' );

	return is.not.a.string( _base ) ? self.__baseUrl : self;
};

Model.prototype.$collection = function ( _query ) {
	var self = this,
		url = self.$url(),
		method = 'get',
		query = is.an.object( _query ) ? _query : {},
		callback = is.a.func( _query ) ? _query : is.a.func( _callback ) ? _callback : helpers.noop;

	self.emit( 'precollection', {
		model: self,
		method: method,
		query: query,
		url: url,
		callback: callback
	} );

	request( self, query, method, url, function ( _error, _res ) {
		self.emit( 'collection', _error, _res );
		callback.apply( self, arguments );
	} );

};

Model.prototype.$destroy = function ( _callback ) {
	var self = this,
		isDirty = self.$isDirty(),
		data = self.$json(),
		url = self.$url() + ( self.__keyless ? '' : '/' + self[ self.__key ] ),
		method = 'delete',
		callback = is.a.func( _callback ) ? _callback : helpers.noop;

	self.emit( 'predestroy', {
		model: self,
		data: data,
		method: method,
		url: url,
		callback: callback
	} );

	if ( !isDirty ) {
		request( self, data, method, url, function () {

			self.emit( 'destroy', self );

			self.__destroyed = true;
			callback.apply( self, arguments );
		} );
	} else {
		callback.apply( self, [ new Error( 'This model cannot be destroyed because it has not been saved to the server yet.' ) ] );
	}

};

Model.prototype.$data = function ( _data ) {
	var self = this,
		data = is.object( _data ) ? _data : {};

	Object.keys( data ).forEach( function ( _key ) {
		if ( self.__attributes.hasOwnProperty( _key ) ) {
			if ( is.an.array( data[ _key ] ) && hasKey( self.__attributes[ _key ], 'arrayOfAType', 'boolean' ) && self.__attributes[ _key ].arrayOfAType === true ) {
				data[ _key ].forEach( function ( _model ) {
					self[ _key ].push( _model );
				} );
			} else if ( is.a.object( data[ _key ] ) && self[ _key ] instanceof Model ) {
				self[ _key ].$data( data[ _key ] );
			} else {
				self[ _key ] = data[ _key ];
			}
		}
	} );

	return self;
};

Model.prototype.$clone = function ( _data ) {
	var self = this,
		data = cast( _data, 'object', {} ),
		newModel = new Model( self.__name, {
			baseUrl: self.__baseUrl,
			headers: self.__headers,
			key: self.__key,
			keyless: self.__keyless,
			url: self.__url
		} );

	Object.keys( self.__attributes ).forEach( function ( _propertyKey ) {
		newModel.$property( _propertyKey, merge( self.__attributes[ _propertyKey ] ) );
		newModel[ _propertyKey ] = data[ _propertyKey ]
	} );

	return newModel;
};

Model.prototype.$get = function ( _query, _callback ) {
	var self = this,
		url = self.$url(),
		method = 'get',
		query = is.an.object( _query ) ? _query : {},
		callback = is.a.func( _query ) ? _query : is.a.func( _callback ) ? _callback : helpers.noop;

	self.emit( 'preget', {
		model: self,
		method: method,
		query: query,
		url: url,
		callback: callback
	} );

	request( self, query, method, url, function ( _error, _res ) {
		self.emit( 'get', _error, _res );
		callback.apply( self, arguments );
	} );

};

Model.prototype.$headers = function ( _headers ) {
	this.__headers = is.an.object( _headers ) ? _headers : this.__headers;
	return is.not.an.object( _headers ) ? this.__headers : this;
};

Model.prototype.$isDirty = function () {
	return is.empty( this[ this.__key ] );
};

Model.prototype.$isValid = function () {
	var self = this,
		isValid = true;

	Object.keys( self.__attributes ).forEach( function ( _key ) {

		if ( self.$isDirty() && _key === self.__key ) {
			return;
		}

		var value = self[ _key ],
			attributes = self.__attributes[ _key ],
			type = attributes.type,
			arrayOfAType = hasKey( attributes, 'arrayOfAType', 'boolean' ) ? attributes.arrayOfAType === true : false,
			isRequired = attributes.optional !== true,
			isNullOrUndefined = self.__keyless ? false : arrayOfAType ? value.length === 0 : is.nullOrUndefined( value ),
			typeIsWrong = is.not.empty( type ) && is.a.string( type ) ? is.not.a[ type ]( value ) : isNullOrUndefined;

		if ( arrayOfAType && is.not.empty( value ) && value[ 0 ] instanceof Model ) {
			value.forEach( function ( _item ) {
				if ( isValid && _item.$isValid() === false ) {
					isValid = false;
				}
			} );
		}

		if ( isValid && isRequired && typeIsWrong ) {
			isValid = false;
		}

	} );

	return isValid;
};

Model.prototype.$json = function () {
	var self = this,
		data = self.__data,
		json = {};

	Object.keys( data ).forEach( function ( _key ) {
		if ( is.an.array( data[ _key ] ) && data[ _key ][ 0 ] instanceof Model ) {
			json[ _key ] = [];
			data[ _key ].forEach( function ( _model ) {
				json[ _key ].push( _model.$json() );
			} );
		} else if ( is.not.an.object( data[ _key ] ) ) {
			json[ _key ] = data[ _key ];
		} else if ( data[ _key ] instanceof Model ) {
			json[ _key ] = data[ _key ].$json();
		}
	} );

	return json;
};

Model.prototype.$property = function ( _key, _value ) {
	var self = this,
		attributes = new helpers.attributes( _key, _value ),
		existingValue = self[ _key ],
		attributeTypeIsAnInstantiatedModel = is.a.string( attributes.type ) && /model/.test( attributes.type ),
		attributeTypeIsAnArray = is.an.array( attributes.type ),
		valueIsAnArrayModel = is.an.array( _value ) && hasKey( _value[ 0 ], 'properties', 'object' ),
		valueIsAnArrayString = is.an.array( _value ) && is.a.string( _value[ 0 ] ),
		attributeArrayTypeIsAModel = attributeTypeIsAnArray && hasKey( attributes.type[ 0 ], 'properties', 'object' ),
		attributeArrayTypeIsAString = attributeTypeIsAnArray && is.a.string( attributes.type[ 0 ] ) && is.not.empty( attributes.type[ 0 ] ),
		valueIsAStaticModel = hasKey( _value, 'properties', 'object' );

	if ( !self.hasOwnProperty( _key ) || !self.__attributes.hasOwnProperty( _key ) ) {

		if ( valueIsAnArrayModel || valueIsAnArrayString ) {
			attributes.type = _value;
			attributeArrayTypeIsAModel = valueIsAnArrayModel;
			attributeArrayTypeIsAString = valueIsAnArrayString;
			attributeTypeIsAnArray = true;
		}

		if ( attributeTypeIsAnInstantiatedModel ) {

			Object.defineProperty( self, _key, {
				value: attributes[ 'default' ],
				enumerable: true,
			} );

			self.__data[ _key ] = self[ _key ];

		} else if ( valueIsAStaticModel ) {

			Object.defineProperty( self, _key, {
				value: new Model( _value.name, _value ),
				enumerable: true,
			} );

			self.__data[ _key ] = self[ _key ];

		} else if ( attributeTypeIsAnArray ) {

			var array = observableArray( [] ),
				attributeType = attributeArrayTypeIsAString || attributeArrayTypeIsAModel ? attributes.type[ 0 ] : '*';

			attributes.arrayOfAType = true;

			Object.defineProperty( self, _key, {
				value: array,
				enumerable: true
			} );

			self.__data[ _key ] = self[ _key ];

			[ 'push', 'unshift' ].forEach( function ( _method ) {
				array.on( _method, function () {
					var args = Array.prototype.slice.call( arguments ),
						values = [];
					args.forEach( function ( _item ) {
						if ( attributeArrayTypeIsAModel ) {
							var model = new Model( attributeType[ 'name' ], attributeType ),
								data = is.an.object( _item ) ? _item : attributes[ 'default' ];
							model.$data( data );
							values.push( model );
						} else {
							values.push( cast( _item, attributeType, attributes[ 'default' ] ) );
						}
					} );
					return array[ '__' + _method ].apply( array, values );
				} );
			} );

		} else {
			Object.defineProperty( self, _key, {
				get: helpers.getProperty( _key ),
				set: helpers.setProperty( _key ),
				enumerable: true
			} );
		}

		self.__attributes[ _key ] = attributes;
	}

	if ( existingValue !== undefined ) {
		self[ _key ] = existingValue;
	} else if ( is.empty( self[ _key ] ) && attributes.optional === false && is.not.nullOrUndefined( attributes[ 'default' ] ) ) {
		self[ _key ] = attributes[ 'default' ];
	} else if ( is.empty( self[ _key ] ) && attributes.optional === false ) {
		if ( attributeTypeIsAnArray || attributeTypeIsAnInstantiatedModel ) {
			self.__data[ _key ] = self[ _key ];
		} else {
			self.__data[ _key ] = is.empty( attributes.type ) ? undefined : cast( undefined, attributes.type );
		}
	}

	return self;
};

Model.prototype.$save = function ( _callback ) {
	var self = this,
		error = null,
		isDirty = self.$isDirty(),
		data = self.$json(),
		url = self.$url() + ( !isDirty && !self.__keyless ? '/' + self[ self.__key ] : '' ),
		method = isDirty ? 'post' : 'put',
		callback = is.a.func( _callback ) ? _callback : helpers.noop;

	self.emit( 'presave', {
		model: self,
		data: data,
		method: method,
		url: url,
		callback: callback
	} );

	request( self, data, method, url, function ( _error, _res ) {
		self.emit( 'save', _error, _res );
		callback.apply( self, arguments );
	} );

};

Model.prototype.$url = function ( _url ) {
	var self = this,
		base = is.empty( self.__baseUrl ) ? '' : self.__baseUrl,
		name = is.empty( self.__name ) ? '' : '/' + self.__name.trim().replace( /^\//, '' ),
		url = _url || self.__url || '',
		endpoint = base + name + ( is.empty( url ) ? '' : '/' + url.trim().replace( /^\//, '' ) );

	self.__url = url.trim().replace( /^\//, '' );

	return is.not.a.string( _url ) ? endpoint : self;
};

emitter( Model.prototype );
useify( Model );

exports = module.exports = Model;

/**
 * Expose built in middleware
 */
exports.schema = _dereq_( './middleware/schema.middleware' );
exports.ajax = _dereq_( './middleware/ajax.middleware' );

},{"./helpers":25,"./middleware/ajax.middleware":27,"./middleware/schema.middleware":28,"./request":29,"emitter-component":17,"sc-cast":18,"sc-haskey":30,"sc-is":32,"sc-merge":20,"sc-useify":23,"sg-observable-array":24}],27:[function(_dereq_,module,exports){
var superagent = _dereq_( 'superagent' ),
	cast = _dereq_( 'sc-cast' ),
	is = _dereq_( 'sc-is' ),
	hasKey = _dereq_( 'sc-haskey' );

module.exports = function ( _model, _data, _method, _url, _callback ) {
	var method = /delete/i.test( _method ) ? 'del' : _method,
		model = _model,
		data = cast( _data, 'object', {} ),
		url = _url,
		error;

	if ( /get/i.test( method ) && hasKey( data, model.__key ) && new RegExp( data[ model.__key ] ).test( url ) === false ) {
		url += '/' + data[ model.__key ];
		delete data[ model.__key ];
	}

	superagent[ method ]( url )[ /get/i.test( method ) ? 'query' : 'send' ]( data )
		.set( model.$headers() )
		.type( 'json' )
		.accept( 'json' )
		.end( function ( _error, _res ) {
			var res = is.an.object( _res ) ? _res : {},
				body = hasKey( _res, 'body' ) && ( is.object( _res.body ) || is.array( _res.body ) ) ? _res.body : null;

			if ( res[ 'ok' ] !== true ) {
				error = new Error( 'The response from the server was not OK' );
			}

			if ( body === null ) {
				error = new Error( 'The response from the server contained an empty body' );
			}

			_callback && _callback( error, body );

		} );

}
},{"sc-cast":18,"sc-haskey":30,"sc-is":32,"superagent":39}],28:[function(_dereq_,module,exports){
var superagent = _dereq_( 'superagent' ),
	is = _dereq_( 'sc-is' ),
	hasKey = _dereq_( 'sc-haskey' );

module.exports = function ( _model, _data, _method, _url, _next ) {

	if ( !_model[ '__schema' ] ) {

		superagent.get( _model.$url() + '/schema' ).end( function ( _error, _res ) {
			var error = _error,
				res = is.an.object( _res ) ? _res : {},
				body = hasKey( _res, 'body' ) && is.object( _res.body ) ? _res.body : {};

			if ( !error && res[ 'ok' ] !== true ) {
				error = new Error( 'The response from the server was not OK' );
			}

			if ( error ) {
				throw error;
			}

			Object.defineProperty( _model, '__schema', {
				value: body
			} );

			Object.keys( body ).forEach( function ( _key ) {

				if ( is.a.func( _model[ '$' + _key ] ) ) {
					_model[ '$' + _key ]( body[ _key ] );
				}

				if ( _key === 'properties' && is.object( body[ _key ] ) ) {
					Object.keys( body.properties ).forEach( function ( _propertyKey ) {
						var existingValue = _model[ _propertyKey ];
						_model.$property( _propertyKey, body.properties[ _propertyKey ] );
						if ( is.not.empty( existingValue ) ) {
							_model[ _propertyKey ] = existingValue;
						}
					} );
				}

			} );

			_next( _model, _data, _method, _url );

		} );

	} else {
		_next( _model, _data, _method, _url );
	}

};
},{"sc-haskey":30,"sc-is":32,"superagent":39}],29:[function(_dereq_,module,exports){
var is = _dereq_( 'sc-is' ),
	cast = _dereq_( 'sc-cast' ),
	hasKey = _dereq_( 'sc-haskey' );

module.exports = function ( _model, _data, _method, _url, _callback ) {
	var model = _model,
		items = [],
		responseShouldContainAnId = hasKey( _data, model.__key ) && is.not.empty( _data[ model.__key ] ) && /get/.test( _method ),
		isDirty = model.$isDirty();

	model.middleware( function ( _error, _response ) {
		var args = Array.prototype.slice.call( arguments ),
			error = _error === model ? null : args.shift(),
			response = args.shift();

		if ( error && !( error instanceof Error ) ) {
			error = new Error( 'An unknown error occurred' );
		}

		if ( !error && isDirty && is.object( response ) && ( responseShouldContainAnId && !hasKey( response, model.__key ) ) ) {
			error = new Error( 'The response from the server did not contain a valid `' + model.__key + '`' );
		}

		if ( !error && isDirty && is.object( response ) ) {
			model[ model.__key ] = response[ model.__key ];
		}

		if ( !error ) {
			if ( is.array( response ) ) {
				response.forEach( function ( _data ) {
					items.push( model.$clone( _data ) );
				} );
				model = items;
			} else {
				model.$data( response );
			}
		}

		_callback && _callback( error, model );

	}, _model, _data, _method, _url );

};

},{"sc-cast":18,"sc-haskey":30,"sc-is":32}],30:[function(_dereq_,module,exports){
var type = _dereq_( "type-component" ),
  has = Object.prototype.hasOwnProperty;

function hasKey( object, keys, keyType ) {

  object = type( object ) === "object" ? object : {}, keys = type( keys ) === "array" ? keys : [];
  keyType = type( keyType ) === "string" ? keyType : "";

  var key = keys.length > 0 ? keys.shift() : "",
    keyExists = has.call( object, key ) || object[ key ] !== void 0,
    keyValue = keyExists ? object[ key ] : undefined,
    keyTypeIsCorrect = type( keyValue ) === keyType;

  if ( keys.length > 0 && keyExists ) {
    return hasKey( object[ key ], keys, keyType );
  }

  return keys.length > 0 || keyType === "" ? keyExists : keyExists && keyTypeIsCorrect;

}

module.exports = function ( object, keys, keyType ) {

  keys = type( keys ) === "string" ? keys.split( "." ) : [];

  return hasKey( object, keys, keyType );

};
},{"type-component":31}],31:[function(_dereq_,module,exports){
module.exports=_dereq_(21)
},{}],32:[function(_dereq_,module,exports){
var type = _dereq_( "./ises/type" ),
  is = {
    a: {},
    an: {},
    not: {
      a: {},
      an: {}
    }
  };

var ises = {
  "arguments": [ "arguments", type( "arguments" ) ],
  "array": [ "array", type( "array" ) ],
  "boolean": [ "boolean", type( "boolean" ) ],
  "date": [ "date", type( "date" ) ],
  "function": [ "function", "func", "fn", type( "function" ) ],
  "null": [ "null", type( "null" ) ],
  "number": [ "number", "integer", "int", type( "number" ) ],
  "object": [ "object", type( "object" ) ],
  "regexp": [ "regexp", type( "regexp" ) ],
  "string": [ "string", type( "string" ) ],
  "undefined": [ "undefined", type( "undefined" ) ],
  "empty": [ "empty", _dereq_( "./ises/empty" ) ],
  "nullorundefined": [ "nullOrUndefined", "nullorundefined", _dereq_( "./ises/nullorundefined" ) ],
  "guid": [ "guid", _dereq_( "./ises/guid" ) ]
}

Object.keys( ises ).forEach( function ( key ) {

  var methods = ises[ key ].slice( 0, ises[ key ].length - 1 ),
    fn = ises[ key ][ ises[ key ].length - 1 ];

  methods.forEach( function ( methodKey ) {
    is[ methodKey ] = is.a[ methodKey ] = is.an[ methodKey ] = fn;
    is.not[ methodKey ] = is.not.a[ methodKey ] = is.not.an[ methodKey ] = function () {
      return fn.apply( this, arguments ) ? false : true;
    }
  } );

} );

exports = module.exports = is;
exports.type = type;
},{"./ises/empty":33,"./ises/guid":34,"./ises/nullorundefined":35,"./ises/type":36}],33:[function(_dereq_,module,exports){
var type = _dereq_("../type");

module.exports = function ( value ) {
  var empty = false;

  if ( type( value ) === "null" || type( value ) === "undefined" ) {
    empty = true;
  } else if ( type( value ) === "object" ) {
    empty = Object.keys( value ).length === 0;
  } else if ( type( value ) === "boolean" ) {
    empty = value === false;
  } else if ( type( value ) === "number" ) {
    empty = value === 0 || value === -1;
  } else if ( type( value ) === "array" || type( value ) === "string" ) {
    empty = value.length === 0;
  }

  return empty;

};
},{"../type":38}],34:[function(_dereq_,module,exports){
var guid = _dereq_( "sc-guid" );

module.exports = function ( value ) {
  return guid.isValid( value );
};
},{"sc-guid":37}],35:[function(_dereq_,module,exports){
module.exports = function ( value ) {
	return value === null || value === undefined || value === void 0;
};
},{}],36:[function(_dereq_,module,exports){
var type = _dereq_( "../type" );

module.exports = function ( _type ) {
  return function ( _value ) {
    return type( _value ) === _type;
  }
}
},{"../type":38}],37:[function(_dereq_,module,exports){
var guidRx = "{?[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}}?";

exports.generate = function () {
  var d = new Date().getTime();
  var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function ( c ) {
    var r = ( d + Math.random() * 16 ) % 16 | 0;
    d = Math.floor( d / 16 );
    return ( c === "x" ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
  } );
  return guid;
};

exports.match = function ( string ) {
  var rx = new RegExp( guidRx, "g" ),
    matches = ( typeof string === "string" ? string : "" ).match( rx );
  return Array.isArray( matches ) ? matches : [];
};

exports.isValid = function ( guid ) {
  var rx = new RegExp( guidRx );
  return rx.test( guid );
};
},{}],38:[function(_dereq_,module,exports){
var toString = Object.prototype.toString;

module.exports = function ( val ) {
  switch ( toString.call( val ) ) {
  case '[object Function]':
    return 'function';
  case '[object Date]':
    return 'date';
  case '[object RegExp]':
    return 'regexp';
  case '[object Arguments]':
    return 'arguments';
  case '[object Array]':
    return 'array';
  }

  if ( val === null ) return 'null';
  if ( val === undefined ) return 'undefined';
  if ( val === Object( val ) ) return 'object';

  return typeof val;
};
},{}],39:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Emitter = _dereq_('emitter');
var reduce = _dereq_('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

function getXHR() {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
}

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  this.text = this.xhr.responseText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var path = req.path;

  var msg = 'cannot ' + method + ' ' + path + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.path = path;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var res = new Response(self);
    if ('HEAD' == method) res.text = null;
    self.callback(null, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  if (2 == fn.length) return fn(err, res);
  if (err) return this.emit('error', err);
  fn(res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      self.emit('progress', e);
    };
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":40,"reduce":41}],40:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = callbacks.indexOf(fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],41:[function(_dereq_,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9hcHAuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9jbGFzc2VzL2Jhc2UuY2xhc3MuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9jbGFzc2VzL21vZGVsLmNsYXNzLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9hcHAvY2xpZW50L3NjcmlwdHMvY2xhc3Nlcy9zZXJ2aWNlLmNsYXNzLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9hcHAvY2xpZW50L3NjcmlwdHMvY29uZmlnLmpzb24iLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9lbnZpcm9ubWVudC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vYXBwL2NsaWVudC9zY3JpcHRzL2Zha2VfODFlNGJkMmIuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9oZWxwZXJzL2luZGV4LmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9hcHAvY2xpZW50L3NjcmlwdHMvaGVscGVycy9zY29wZS5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vYXBwL2NsaWVudC9zY3JpcHRzL21vZGVscy9leGFtcGxlLm1vZGVsLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9hcHAvY2xpZW50L3NjcmlwdHMvbW9kZWxzL2d1eS5tb2RlbC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vYXBwL2NsaWVudC9zY3JpcHRzL21vZHVsZXMuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9yb3V0ZXMuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL2FwcC9jbGllbnQvc2NyaXB0cy9zZXJ2aWNlcy9hYm91dC5zZXJ2aWNlLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9hcHAvY2xpZW50L3NjcmlwdHMvc2VydmljZXMvbWFpbi5zZXJ2aWNlLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMva2xhc3Mva2xhc3MuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9tb2xkeS9ub2RlX21vZHVsZXMvZW1pdHRlci1jb21wb25lbnQvaW5kZXguanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9tb2xkeS9ub2RlX21vZHVsZXMvc2MtY2FzdC9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL21vbGR5L25vZGVfbW9kdWxlcy9zYy1jYXN0L25vZGVfbW9kdWxlcy9zYy1jb250YWlucy9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL21vbGR5L25vZGVfbW9kdWxlcy9zYy1tZXJnZS9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL21vbGR5L25vZGVfbW9kdWxlcy9zYy1tZXJnZS9ub2RlX21vZHVsZXMvdHlwZS1jb21wb25lbnQvaW5kZXguanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9tb2xkeS9ub2RlX21vZHVsZXMvc2MtdXNlaWZ5L2NvbmZpZy5qc29uIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvbW9sZHkvbm9kZV9tb2R1bGVzL3NjLXVzZWlmeS9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL21vbGR5L25vZGVfbW9kdWxlcy9zZy1vYnNlcnZhYmxlLWFycmF5L3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL21vbGR5L3NyYy9oZWxwZXJzL2luZGV4LmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvbW9sZHkvc3JjL2luZGV4LmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvbW9sZHkvc3JjL21pZGRsZXdhcmUvYWpheC5taWRkbGV3YXJlLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvbW9sZHkvc3JjL21pZGRsZXdhcmUvc2NoZW1hLm1pZGRsZXdhcmUuanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9tb2xkeS9zcmMvcmVxdWVzdC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL3NjLWhhc2tleS9pbmRleC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL3NjLWlzL2luZGV4LmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvc2MtaXMvaXNlcy9lbXB0eS5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL3NjLWlzL2lzZXMvZ3VpZC5qcyIsIi9Vc2Vycy9kYXZpZHRzdWppL0Ryb3Bib3gvU2l0ZXMvc2cvbW9sZHkuaW8vbm9kZV9tb2R1bGVzL3NjLWlzL2lzZXMvbnVsbG9ydW5kZWZpbmVkLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvc2MtaXMvaXNlcy90eXBlLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvc2MtaXMvbm9kZV9tb2R1bGVzL3NjLWd1aWQvaW5kZXguanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9zYy1pcy90eXBlLmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvY2xpZW50LmpzIiwiL1VzZXJzL2RhdmlkdHN1amkvRHJvcGJveC9TaXRlcy9zZy9tb2xkeS5pby9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvZW1pdHRlci1jb21wb25lbnQvaW5kZXguanMiLCIvVXNlcnMvZGF2aWR0c3VqaS9Ecm9wYm94L1NpdGVzL3NnL21vbGR5LmlvL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L25vZGVfbW9kdWxlcy9yZWR1Y2UtY29tcG9uZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNStCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gZXhwb3J0cztcblxuLyogQ29yZSAqL1xuYXBwLmNsYXNzID0ge307XG5hcHAuY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcuanNvbicpO1xuYXBwLmNvbnRyb2xsZXIgPSBudWxsO1xuYXBwLmVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9lbnZpcm9ubWVudCcpO1xuYXBwLmhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcbmFwcC5tb2RlbCA9IHt9O1xuYXBwLm1vZHVsZXMgPSByZXF1aXJlKCcuL21vZHVsZXMnKTtcbmFwcC5yb3V0ZXMgPSByZXF1aXJlKCcuL3JvdXRlcycpO1xuYXBwLnNjb3BlID0gbnVsbDtcbmFwcC5zZWxmID0gbnVsbDtcbmFwcC5zZXJ2aWNlID0ge307XG5cbi8qIENsYXNzZXMgKi9cbmFwcC5jbGFzcy5iYXNlID0gcmVxdWlyZSgnLi9jbGFzc2VzL2Jhc2UuY2xhc3MnKTtcbmFwcC5jbGFzcy5tb2RlbCA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9tb2RlbC5jbGFzcycpO1xuYXBwLmNsYXNzLnNlcnZpY2UgPSByZXF1aXJlKCcuL2NsYXNzZXMvc2VydmljZS5jbGFzcycpO1xuXG4vKiBTZXJ2aWNlcyAqL1xuYXBwLnNlcnZpY2UubWFpbiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbWFpbi5zZXJ2aWNlJyk7XG5hcHAuc2VydmljZS5hYm91dCA9IHJlcXVpcmUoJy4vc2VydmljZXMvYWJvdXQuc2VydmljZScpO1xuXG4vKiBNb2RlbHMgKi9cbmFwcC5tb2RlbC5leGFtcGxlID0gcmVxdWlyZSgnLi9tb2RlbHMvZXhhbXBsZS5tb2RlbCcpO1xuYXBwLm1vZGVsLmd1eSA9IHJlcXVpcmUoJy4vbW9kZWxzL2d1eS5tb2RlbCcpO1xuXG4vKiBNaWRkbGV3YXJlICovXG5hcHAubW9kdWxlcy5tb2xkeS51c2UoYXBwLm1vZHVsZXMubW9sZHkuc2NoZW1hKTtcbmFwcC5tb2R1bGVzLm1vbGR5LnVzZShhcHAubW9kdWxlcy5tb2xkeS5hamF4KTsiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwLm1vZHVsZXMua2xhc3MoZnVuY3Rpb24gKCkge30pOyIsInZhciBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHAuY2xhc3MuYmFzZS5leHRlbmQoZnVuY3Rpb24gKCkge1xuXG59KS5tZXRob2RzKHtcblxuXHRhZGRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRjYiA9IGZ1bmN0aW9uIChfbWV0aG9kKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2VsZltfbWV0aG9kXS5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHRoaXMubW9kZWwub24oJ3ByZWdldCcsIGNiKCdwcmVnZXQnKSk7XG5cdFx0dGhpcy5tb2RlbC5vbignZ2V0JywgY2IoJ2dldCcpKTtcblx0XHR0aGlzLm1vZGVsLm9uKCdwcmVzYXZlJywgY2IoJ3ByZXNhdmUnKSk7XG5cdFx0dGhpcy5tb2RlbC5vbignc2F2ZScsIGNiKCdzYXZlJykpO1xuXHRcdHRoaXMubW9kZWwub24oJ3ByZWRlc3Ryb3knLCBjYigncHJlZGVzdHJveScpKTtcblx0XHR0aGlzLm1vZGVsLm9uKCdkZXN0cm95JywgY2IoJ2Rlc3Ryb3knKSk7XG5cdH0sXG5cblx0cHJlZGVzdHJveTogZnVuY3Rpb24gKCkge30sXG5cdHByZWdldDogZnVuY3Rpb24gKCkge30sXG5cdHByZXNhdmU6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdGNvbGxlY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuaGVscGVycy5zY29wZS5hcHBseSgpO1xuXHR9LFxuXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuaGVscGVycy5zY29wZS5hcHBseSgpO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5oZWxwZXJzLnNjb3BlLmFwcGx5KCk7XG5cdH0sXG5cblx0c2F2ZTogZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5oZWxwZXJzLnNjb3BlLmFwcGx5KCk7XG5cdH1cblxufSk7IiwidmFyIGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcC5jbGFzcy5iYXNlLmV4dGVuZChmdW5jdGlvbiAoKSB7XG5cdHRoaXMubW9kZWwgPSB7fTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJhcGlcIjoge1xuXHRcdFwiYmFzZVwiOiBcIi9hcGlcIlxuXHR9XG59IiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnN3aXRjaCAodHJ1ZSkge1xuXG5cdC8vIGNhc2UgL2RvbWFpbi5jb20vLnRlc3Qod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKTpcblx0Ly8gXHRhcHAuY29uZmlnLmVudmlyb25tZW50ID0gJ3Byb2QnO1xuXHQvLyBcdGJyZWFrO1xuZGVmYXVsdDpcblx0YXBwLmNvbmZpZy5lbnZpcm9ubWVudCA9ICdsb2NhbCc7XG5cdGJyZWFrO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwLmNvbmZpZy5lbnZpcm9ubWVudDsiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYXBwO1xuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZSddKS5jb25maWcoYXBwLnJvdXRlcyk7XG5cbmV4cG9ydHMuY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGUsICRyb3V0ZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcblx0dmFyIGNvbnRyb2xsZXIgPSBhcHAuY29udHJvbGxlciA9IHRoaXM7XG5cblx0YXBwLnNjb3BlID0gJHNjb3BlO1xuXHRhcHAuc2NvcGUuJHJvdXRlID0gJHJvdXRlO1xuXHRhcHAuc2NvcGUuJHJvdXRlUGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuXHRhcHAuc2NvcGUuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuXG5cdC8qIERlcGVuZGVuY2llcyAqL1xuXHQvLyBhcHAuc2NvcGUubW9tZW50ID0gbW9tZW50O1xuXG5cdE9iamVjdC5rZXlzKGFwcC5zZXJ2aWNlKS5mb3JFYWNoKGZ1bmN0aW9uIChfa2V5KSB7XG5cdFx0Y29udHJvbGxlcltfa2V5ICsgJ1NlcnZpY2UnXSA9IG5ldyBhcHAuc2VydmljZVtfa2V5XSgpO1xuXHR9KTtcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0c2NvcGU6IHJlcXVpcmUoJy4vc2NvcGUnKVxufTsiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbmV4cG9ydHMuYXBwbHkgPSBmdW5jdGlvbiAoKSB7XG5cdGFwcC5zY29wZS4kYXBwbHkoKTtcbn07IiwidmFyIGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcC5jbGFzcy5tb2RlbC5leHRlbmQoZnVuY3Rpb24gKCkge1xuXG5cdHRoaXMubW9kZWwgPSBuZXcgYXBwLm1vZHVsZXMubW9sZHkoJ2V4YW1wbGUnLCB7XG5cdFx0YmFzZVVybDogYXBwLmNvbmZpZy5hcGkuYmFzZVxuXHR9KTtcblxuXHR0aGlzLmFkZExpc3RlbmVycygpO1xuXG59KTsiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwLmNsYXNzLm1vZGVsLmV4dGVuZChmdW5jdGlvbiAoKSB7XG5cblx0dGhpcy5tb2RlbCA9IG5ldyBhcHAubW9kdWxlcy5tb2xkeSgnZ3V5Jywge1xuXHRcdGJhc2VVcmw6IGFwcC5jb25maWcuYXBpLmJhc2Vcblx0fSk7XG5cblx0dGhpcy5hZGRMaXN0ZW5lcnMoKTtcblxufSk7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHRrbGFzczogcmVxdWlyZSgna2xhc3MnKSxcblx0bW9sZHk6IHJlcXVpcmUoJ21vbGR5Jylcbn07IiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbnZhciBjb250cm9sbGVyID0gZnVuY3Rpb24gKF9zZXJ2aWNlKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHNlbGYgPSBhcHAuc2NvcGUuc2VsZiA9IGFwcC5zZWxmID0gYXBwLmNvbnRyb2xsZXJbX3NlcnZpY2VdO1xuXG5cdFx0c2VsZi5uYW1lID0gX3NlcnZpY2U7XG5cdFx0c2VsZi5pbml0aWFsaXNlZCA9IGZhbHNlO1xuXHRcdHNlbGYuaW5pdCgpO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cblx0JHJvdXRlUHJvdmlkZXJcblxuXHQud2hlbignL2Fib3V0Jywge1xuXHRcdHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL2Fib3V0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIoJ2Fib3V0U2VydmljZScpXG5cdH0pXG5cblx0Lm90aGVyd2lzZSh7XG5cdFx0dGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9tYWluLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIoJ21haW5TZXJ2aWNlJylcblx0fSk7XG5cblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXG59OyIsInZhciBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHAuY2xhc3Muc2VydmljZS5leHRlbmQoZnVuY3Rpb24gKCkge30pLm1ldGhvZHMoe1xuXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZWxmLmluaXRpYWxpc2VkID0gdHJ1ZTtcblx0fVxuXG59KTsiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwLmNsYXNzLnNlcnZpY2UuZXh0ZW5kKGZ1bmN0aW9uICgpIHt9KS5tZXRob2RzKHtcblxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0c2VsZi5tb2RlbC5leGFtcGxlID0gbmV3IGFwcC5tb2RlbC5leGFtcGxlKCkubW9kZWw7XG5cdFx0c2VsZi5tb2RlbC5ndXkgPSBuZXcgYXBwLm1vZGVsLmd1eSgpLm1vZGVsO1xuXG5cdFx0YXN5bmMud2F0ZXJmYWxsKFtcblxuXHRcdFx0ZnVuY3Rpb24gKF9jYWxsYmFjaykge1xuXHRcdFx0XHRzZWxmLm1vZGVsLmd1eS4kZ2V0KGZ1bmN0aW9uIChfZXJyb3IpIHtcblx0XHRcdFx0XHRfY2FsbGJhY2soX2Vycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRmdW5jdGlvbiAoX2NhbGxiYWNrKSB7XG5cdFx0XHRcdHNlbGYubW9kZWwuZXhhbXBsZS4kZ2V0KGZ1bmN0aW9uIChfZXJyb3IpIHtcblx0XHRcdFx0XHRfY2FsbGJhY2soX2Vycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRdLCBmdW5jdGlvbiAoX2Vycm9yKSB7XG5cdFx0XHRpZiAoX2Vycm9yKSB0aHJvdyBfZXJyb3I7XG5cdFx0XHRzZWxmLmluaXRpYWxpc2VkID0gdHJ1ZTtcblx0XHR9KTtcblxuXHR9XG5cbn0pOyIsIi8qIVxuICAqIGtsYXNzOiBhIGNsYXNzaWNhbCBKUyBPT1AgZmHDp2FkZVxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQva2xhc3NcbiAgKiBMaWNlbnNlIE1JVCAoYykgRHVzdGluIERpYXogMjAxNFxuICAqL1xuXG4hZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKVxufSgna2xhc3MnLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpc1xuICAgICwgZiA9ICdmdW5jdGlvbidcbiAgICAsIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24gKCkge3h5en0pID8gL1xcYnN1cHJcXGIvIDogLy4qL1xuICAgICwgcHJvdG8gPSAncHJvdG90eXBlJ1xuXG4gIGZ1bmN0aW9uIGtsYXNzKG8pIHtcbiAgICByZXR1cm4gZXh0ZW5kLmNhbGwoaXNGbihvKSA/IG8gOiBmdW5jdGlvbiAoKSB7fSwgbywgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRm4obykge1xuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gZlxuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChrLCBmbiwgc3Vwcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdG1wID0gdGhpcy5zdXByXG4gICAgICB0aGlzLnN1cHIgPSBzdXByW3Byb3RvXVtrXVxuICAgICAgdmFyIHVuZGVmID0ge30uZmFicmljYXRlZFVuZGVmaW5lZFxuICAgICAgdmFyIHJldCA9IHVuZGVmXG4gICAgICB0cnkge1xuICAgICAgICByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnN1cHIgPSB0bXBcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzKHdoYXQsIG8sIHN1cHIpIHtcbiAgICBmb3IgKHZhciBrIGluIG8pIHtcbiAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIHdoYXRba10gPSBpc0ZuKG9ba10pXG4gICAgICAgICAgJiYgaXNGbihzdXByW3Byb3RvXVtrXSlcbiAgICAgICAgICAmJiBmblRlc3QudGVzdChvW2tdKVxuICAgICAgICAgID8gd3JhcChrLCBvW2tdLCBzdXByKSA6IG9ba11cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQobywgZnJvbVN1Yikge1xuICAgIC8vIG11c3QgcmVkZWZpbmUgbm9vcCBlYWNoIHRpbWUgc28gaXQgZG9lc24ndCBpbmhlcml0IGZyb20gcHJldmlvdXMgYXJiaXRyYXJ5IGNsYXNzZXNcbiAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICBub29wW3Byb3RvXSA9IHRoaXNbcHJvdG9dXG4gICAgdmFyIHN1cHIgPSB0aGlzXG4gICAgICAsIHByb3RvdHlwZSA9IG5ldyBub29wKClcbiAgICAgICwgaXNGdW5jdGlvbiA9IGlzRm4obylcbiAgICAgICwgX2NvbnN0cnVjdG9yID0gaXNGdW5jdGlvbiA/IG8gOiB0aGlzXG4gICAgICAsIF9tZXRob2RzID0gaXNGdW5jdGlvbiA/IHt9IDogb1xuICAgIGZ1bmN0aW9uIGZuKCkge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZSkgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIGVsc2Uge1xuICAgICAgICBmcm9tU3ViIHx8IGlzRnVuY3Rpb24gJiYgc3Vwci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIF9jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm4ubWV0aG9kcyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICBwcm9jZXNzKHByb3RvdHlwZSwgbywgc3VwcilcbiAgICAgIGZuW3Byb3RvXSA9IHByb3RvdHlwZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBmbi5tZXRob2RzLmNhbGwoZm4sIF9tZXRob2RzKS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmblxuXG4gICAgZm4uZXh0ZW5kID0gYXJndW1lbnRzLmNhbGxlZVxuICAgIGZuW3Byb3RvXS5pbXBsZW1lbnQgPSBmbi5zdGF0aWNzID0gZnVuY3Rpb24gKG8sIG9wdEZuKSB7XG4gICAgICBvID0gdHlwZW9mIG8gPT0gJ3N0cmluZycgPyAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqW29dID0gb3B0Rm5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSgpKSA6IG9cbiAgICAgIHByb2Nlc3ModGhpcywgbywgc3VwcilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgcmV0dXJuIGZuXG4gIH1cblxuICByZXR1cm4ga2xhc3Ncbn0pO1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwidmFyIGNvbnRhaW5zID0gcmVxdWlyZSggXCJzYy1jb250YWluc1wiICksXG4gIGlzID0gcmVxdWlyZSggXCJzYy1pc1wiICk7XG5cbnZhciBjYXN0ID0gZnVuY3Rpb24gKCBfdmFsdWUsIF9jYXN0VHlwZSwgX2RlZmF1bHQsIF92YWx1ZXMsIF9hZGRpdGlvbmFsUHJvcGVydGllcyApIHtcblxuICB2YXIgcGFyc2VkVmFsdWUsXG4gICAgY2FzdFR5cGUgPSBfY2FzdFR5cGUsXG4gICAgdmFsdWUsXG4gICAgdmFsdWVzID0gaXMuYW4uYXJyYXkoIF92YWx1ZXMgKSA/IF92YWx1ZXMgOiBbXTtcblxuICBzd2l0Y2ggKCB0cnVlICkge1xuICBjYXNlICggL2Zsb2F0fGludGVnZXIvLnRlc3QoIGNhc3RUeXBlICkgKTpcbiAgICBjYXN0VHlwZSA9IFwibnVtYmVyXCI7XG4gICAgYnJlYWs7XG4gIH1cblxuICBpZiAoIGlzLmFbIGNhc3RUeXBlIF0oIF92YWx1ZSApIHx8IGNhc3RUeXBlID09PSAnKicgKSB7XG5cbiAgICB2YWx1ZSA9IF92YWx1ZTtcblxuICB9IGVsc2Uge1xuXG4gICAgc3dpdGNoICggdHJ1ZSApIHtcblxuICAgIGNhc2UgY2FzdFR5cGUgPT09IFwiYXJyYXlcIjpcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCBpcy5hLnN0cmluZyggX3ZhbHVlICkgKSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKCBfdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIGlzLm5vdC5hbi5hcnJheSggdmFsdWUgKSApIHtcbiAgICAgICAgICB0aHJvdyBcIlwiO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgaWYgKCBpcy5ub3QubnVsbE9yVW5kZWZpbmVkKCBfdmFsdWUgKSApIHtcbiAgICAgICAgICB2YWx1ZSA9IFsgX3ZhbHVlIF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBjYXN0VHlwZSA9PT0gXCJib29sZWFuXCI6XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gL14odHJ1ZXwxfHl8eWVzKSQvaS50ZXN0KCBfdmFsdWUudG9TdHJpbmcoKSApID8gdHJ1ZSA6IHVuZGVmaW5lZDtcbiAgICAgIH0gY2F0Y2ggKCBlICkge31cblxuICAgICAgaWYgKCBpcy5ub3QuYS5ib29sZWFuKCB2YWx1ZSApICkge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSAvXihmYWxzZXwtMXwwfG58bm8pJC9pLnRlc3QoIF92YWx1ZS50b1N0cmluZygpICkgPyBmYWxzZSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSBjYXRjaCAoIGUgKSB7fVxuXG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gaXMuYS5ib29sZWFuKCB2YWx1ZSApID8gdmFsdWUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBjYXN0VHlwZSA9PT0gXCJkYXRlXCI6XG5cbiAgICAgIHRyeSB7XG5cbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSggX3ZhbHVlICk7XG4gICAgICAgIHZhbHVlID0gaXNOYU4oIHZhbHVlLmdldFRpbWUoKSApID8gdW5kZWZpbmVkIDogdmFsdWU7XG5cbiAgICAgIH0gY2F0Y2ggKCBlICkge31cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGNhc3RUeXBlID09PSBcInN0cmluZ1wiOlxuXG4gICAgICB0cnkge1xuXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoIF92YWx1ZSApO1xuICAgICAgICBpZiAoIGlzLnVuZGVmaW5lZCggdmFsdWUgKSApIHtcbiAgICAgICAgICB0aHJvdyBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBfdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICB9IGNhdGNoICggZSApIHt9XG5cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGNhc3RUeXBlID09PSBcIm51bWJlclwiOlxuXG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQoIF92YWx1ZSApO1xuICAgICAgICBpZiAoIGlzLm5vdC5hLm51bWJlciggdmFsdWUgKSB8fCBpc05hTiggdmFsdWUgKSApIHtcbiAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgIHZhbHVlID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgc3dpdGNoICggdHJ1ZSApIHtcbiAgICAgICAgY2FzZSBfY2FzdFR5cGUgPT09IFwiaW50ZWdlclwiOlxuICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoIHZhbHVlICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuXG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IGNhc3QoIEpTT04ucGFyc2UoIF92YWx1ZSApLCBjYXN0VHlwZSApXG4gICAgICB9IGNhdGNoICggZSApIHt9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgfVxuXG4gIH1cblxuICBpZiAoIHZhbHVlcy5sZW5ndGggPiAwICYmICFjb250YWlucyggdmFsdWVzLCB2YWx1ZSApICkge1xuICAgIHZhbHVlID0gdmFsdWVzWyAwIF07XG4gIH1cblxuICByZXR1cm4gaXMubm90LnVuZGVmaW5lZCggdmFsdWUgKSA/IHZhbHVlIDogaXMubm90LnVuZGVmaW5lZCggX2RlZmF1bHQgKSA/IF9kZWZhdWx0IDogbnVsbDtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0OyIsInZhciBjb250YWlucyA9IGZ1bmN0aW9uICggZGF0YSwgaXRlbSApIHtcbiAgdmFyIGZvdW5kT25lID0gZmFsc2U7XG5cbiAgaWYgKCBBcnJheS5pc0FycmF5KCBkYXRhICkgKSB7XG5cbiAgICBkYXRhLmZvckVhY2goIGZ1bmN0aW9uICggYXJyYXlJdGVtICkge1xuICAgICAgaWYgKCBmb3VuZE9uZSA9PT0gZmFsc2UgJiYgaXRlbSA9PT0gYXJyYXlJdGVtICkge1xuICAgICAgICBmb3VuZE9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH0gZWxzZSBpZiAoIE9iamVjdCggZGF0YSApID09PSBkYXRhICkge1xuXG4gICAgT2JqZWN0LmtleXMoIGRhdGEgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIGtleSApIHtcblxuICAgICAgaWYgKCBmb3VuZE9uZSA9PT0gZmFsc2UgJiYgZGF0YVsga2V5IF0gPT09IGl0ZW0gKSB7XG4gICAgICAgIGZvdW5kT25lID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0gKTtcblxuICB9XG4gIHJldHVybiBmb3VuZE9uZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFpbnM7IiwidmFyIHR5cGUgPSByZXF1aXJlKCBcInR5cGUtY29tcG9uZW50XCIgKTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuICAgIGRlZXAgPSB0eXBlKCBhcmdzWyAwIF0gKSA9PT0gXCJib29sZWFuXCIgPyBhcmdzLnNoaWZ0KCkgOiBmYWxzZSxcbiAgICBvYmplY3RzID0gYXJncyxcbiAgICByZXN1bHQgPSB7fTtcblxuICBvYmplY3RzLmZvckVhY2goIGZ1bmN0aW9uICggb2JqZWN0biApIHtcblxuICAgIGlmICggdHlwZSggb2JqZWN0biApICE9PSBcIm9iamVjdFwiICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKCBvYmplY3RuICkuZm9yRWFjaCggZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqZWN0biwga2V5ICkgKSB7XG4gICAgICAgIGlmICggZGVlcCAmJiB0eXBlKCBvYmplY3RuWyBrZXkgXSApID09PSBcIm9iamVjdFwiICkge1xuICAgICAgICAgIHJlc3VsdFsga2V5IF0gPSBtZXJnZSggZGVlcCwge30sIHJlc3VsdFsga2V5IF0sIG9iamVjdG5bIGtleSBdICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0WyBrZXkgXSA9IG9iamVjdG5bIGtleSBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH0gKTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTsiLCJcbi8qKlxuICogdG9TdHJpbmcgcmVmLlxuICovXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogUmV0dXJuIHRoZSB0eXBlIG9mIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCl7XG4gIHN3aXRjaCAodG9TdHJpbmcuY2FsbCh2YWwpKSB7XG4gICAgY2FzZSAnW29iamVjdCBGdW5jdGlvbl0nOiByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgICBjYXNlICdbb2JqZWN0IERhdGVdJzogcmV0dXJuICdkYXRlJztcbiAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOiByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgY2FzZSAnW29iamVjdCBBcmd1bWVudHNdJzogcmV0dXJuICdhcmd1bWVudHMnO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzogcmV0dXJuICdhcnJheSc7XG4gIH1cblxuICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuICBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiAndW5kZWZpbmVkJztcbiAgaWYgKHZhbCA9PT0gT2JqZWN0KHZhbCkpIHJldHVybiAnb2JqZWN0JztcblxuICByZXR1cm4gdHlwZW9mIHZhbDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cz17XG5cdFwiZGVmYXVsdHNcIjoge1xuXHRcdFwibWlkZGxld2FyZUtleVwiOiBcImFsbFwiXG5cdH1cbn0iLCJ2YXIgaXMgPSByZXF1aXJlKCBcInNjLWlzXCIgKSxcbiAgY29uZmlnID0gcmVxdWlyZSggXCIuL2NvbmZpZy5qc29uXCIgKSxcbiAgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG52YXIgdXNlaWZ5RnVuY3Rpb24gPSBmdW5jdGlvbiAoIGZ1bmN0aW9ucywga2V5LCBmbiApIHtcbiAgaWYgKCBpcy5ub3QuZW1wdHkoIGtleSApICYmIGlzLmEuc3RyaW5nKCBrZXkgKSApIHtcbiAgICBpZiAoIGlzLm5vdC5hbi5hcnJheSggZnVuY3Rpb25zWyBrZXkgXSApICkge1xuICAgICAgZnVuY3Rpb25zWyBrZXkgXSA9IFtdO1xuICAgIH1cbiAgICBpZiAoIGlzLmEuZnVuYyggZm4gKSApIHtcbiAgICAgIGZ1bmN0aW9uc1sga2V5IF0ucHVzaCggZm4gKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uc1sga2V5IF07XG4gIH1cbn1cblxudmFyIFVzZWlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW5jdGlvbnMgPSB7XG4gICAgYWxsOiBbXVxuICB9O1xufTtcblxuVXNlaWZ5LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuICAgIGtleSA9IGlzLmEuc3RyaW5nKCBhcmdzWyAwIF0gKSA/IGFyZ3Muc2hpZnQoKSA6IGNvbmZpZy5kZWZhdWx0cy5taWRkbGV3YXJlS2V5LFxuICAgIGZuID0gaXMuYS5mdW5jKCBhcmdzWyAwIF0gKSA/IGFyZ3Muc2hpZnQoKSA6IG5vb3A7XG5cbiAgdXNlaWZ5RnVuY3Rpb24oIHNlbGYuZnVuY3Rpb25zLCBrZXksIGZuICk7XG59O1xuXG5Vc2VpZnkucHJvdG90eXBlLm1pZGRsZXdhcmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGN1cnJlbnRGdW5jdGlvbiA9IDAsXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcbiAgICBtaWRkbGV3YXJlS2V5ID0gaXMuYS5zdHJpbmcoIGFyZ3NbIDAgXSApICYmIGlzLmEuZnVuYyggYXJnc1sgMSBdICkgPyBhcmdzLnNoaWZ0KCkgOiBjb25maWcuZGVmYXVsdHMubWlkZGxld2FyZUtleSxcbiAgICBjYWxsYmFjayA9IGlzLmEuZnVuYyggYXJnc1sgMCBdICkgPyBhcmdzLnNoaWZ0KCkgOiBub29wO1xuXG4gIHVzZWlmeUZ1bmN0aW9uKCBzZWxmLmZ1bmN0aW9ucywgbWlkZGxld2FyZUtleSApO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmbiA9IHNlbGYuZnVuY3Rpb25zWyBtaWRkbGV3YXJlS2V5IF1bIGN1cnJlbnRGdW5jdGlvbisrIF0sXG4gICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cyApO1xuXG4gICAgaWYgKCAhZm4gKSB7XG4gICAgICBjYWxsYmFjay5hcHBseSggc2VsZi5jb250ZXh0LCBhcmdzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MucHVzaCggbmV4dCApO1xuICAgICAgZm4uYXBwbHkoIHNlbGYuY29udGV4dCwgYXJncyApO1xuICAgIH1cblxuICB9O1xuXG4gIG5leHQuYXBwbHkoIHNlbGYuY29udGV4dCwgYXJncyApO1xuXG59O1xuXG5Vc2VpZnkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCBtaWRkbGV3YXJlS2V5ICkge1xuICBpZiAoIGlzLmEuc3RyaW5nKCBtaWRkbGV3YXJlS2V5ICkgJiYgaXMubm90LmVtcHR5KCBtaWRkbGV3YXJlS2V5ICkgKSB7XG4gICAgdGhpcy5mdW5jdGlvbnNbIG1pZGRsZXdhcmVLZXkgXSA9IFtdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZnVuY3Rpb25zID0ge1xuICAgICAgYWxsOiBbXVxuICAgIH07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCBfb2JqZWN0T3JGdW5jdGlvbiApIHtcblxuICB2YXIgdXNlaWZ5ID0gbmV3IFVzZWlmeSgpO1xuXG4gIGlmICggaXMuYW4ub2JqZWN0KCBfb2JqZWN0T3JGdW5jdGlvbiApICkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIF9vYmplY3RPckZ1bmN0aW9uLCB7XG5cbiAgICAgIFwidXNlXCI6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB1c2VpZnkudXNlLmFwcGx5KCB1c2VpZnksIGFyZ3VtZW50cyApO1xuICAgICAgICAgIHJldHVybiBfb2JqZWN0T3JGdW5jdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgXCJtaWRkbGV3YXJlXCI6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB1c2VpZnkubWlkZGxld2FyZS5hcHBseSggdXNlaWZ5LCBhcmd1bWVudHMgKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgXCJ1c2VpZnlcIjoge1xuICAgICAgICB2YWx1ZTogdXNlaWZ5XG4gICAgICB9XG5cbiAgICB9ICk7XG5cbiAgICB1c2VpZnkuY29udGV4dCA9IF9vYmplY3RPckZ1bmN0aW9uO1xuXG4gIH0gZWxzZSBpZiAoIGlzLmEuZm4oIF9vYmplY3RPckZ1bmN0aW9uICkgKSB7XG5cbiAgICBfb2JqZWN0T3JGdW5jdGlvbi5wcm90b3R5cGUubWlkZGxld2FyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHVzZWlmeS5jb250ZXh0ID0gdGhpcztcbiAgICAgIHVzZWlmeS5taWRkbGV3YXJlLmFwcGx5KCB1c2VpZnksIGFyZ3VtZW50cyApO1xuICAgIH07XG5cbiAgICBfb2JqZWN0T3JGdW5jdGlvbi51c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB1c2VpZnkudXNlLmFwcGx5KCB1c2VpZnksIGFyZ3VtZW50cyApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9vYmplY3RPckZ1bmN0aW9uLnVzZWlmeSA9IHVzZWlmeTtcblxuICB9XG5cbn07IiwidmFyIE9ic2VydmFibGVBcnJheSA9IGZ1bmN0aW9uICggX2FycmF5ICkge1xuXHR2YXIgaGFuZGxlcnMgPSB7fSxcblx0XHRhcnJheSA9IEFycmF5LmlzQXJyYXkoIF9hcnJheSApID8gX2FycmF5IDogW107XG5cblx0dmFyIHByb3h5ID0gZnVuY3Rpb24gKCBfbWV0aG9kLCBfdmFsdWUgKSB7XG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICk7XG5cblx0XHRpZiAoIGhhbmRsZXJzWyBfbWV0aG9kIF0gKSB7XG5cdFx0XHRyZXR1cm4gaGFuZGxlcnNbIF9tZXRob2QgXS5hcHBseSggYXJyYXksIGFyZ3MgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGFycmF5WyAnX18nICsgX21ldGhvZCBdLmFwcGx5KCBhcnJheSwgYXJncyApO1xuXHRcdH1cblx0fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyggYXJyYXksIHtcblx0XHRvbjoge1xuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uICggX2V2ZW50LCBfY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGhhbmRsZXJzWyBfZXZlbnQgXSA9IF9jYWxsYmFjaztcblx0XHRcdH1cblx0XHR9XG5cdH0gKTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGFycmF5LCAncG9wJywge1xuXHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gcHJveHkoICdwb3AnLCBhcnJheVsgYXJyYXkubGVuZ3RoIC0gMSBdICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBhcnJheSwgJ19fcG9wJywge1xuXHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnBvcC5hcHBseSggYXJyYXksIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fSApO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggYXJyYXksICdzaGlmdCcsIHtcblx0XHR2YWx1ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHByb3h5KCAnc2hpZnQnLCBhcnJheVsgMCBdICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBhcnJheSwgJ19fc2hpZnQnLCB7XG5cdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2hpZnQuYXBwbHkoIGFycmF5LCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH0gKTtcblxuXHRbICdwdXNoJywgJ3JldmVyc2UnLCAndW5zaGlmdCcsICdzb3J0JywgJ3NwbGljZScgXS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9tZXRob2QgKSB7XG5cdFx0dmFyIHByb3BlcnRpZXMgPSB7fTtcblxuXHRcdHByb3BlcnRpZXNbIF9tZXRob2QgXSA9IHtcblx0XHRcdHZhbHVlOiBwcm94eS5iaW5kKCBudWxsLCBfbWV0aG9kIClcblx0XHR9O1xuXG5cdFx0cHJvcGVydGllc1sgJ19fJyArIF9tZXRob2QgXSA9IHtcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoIF92YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZVsgX21ldGhvZCBdLmFwcGx5KCBhcnJheSwgYXJndW1lbnRzICk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBhcnJheSwgcHJvcGVydGllcyApO1xuXHR9ICk7XG5cblx0cmV0dXJuIGFycmF5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZhYmxlQXJyYXk7IiwidmFyIGlzID0gcmVxdWlyZSggJ3NjLWlzJyApLFxuXHRjYXN0ID0gcmVxdWlyZSggJ3NjLWNhc3QnICksXG5cdG1lcmdlID0gcmVxdWlyZSggJ3NjLW1lcmdlJyApO1xuXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoIF9rZXksIF92YWx1ZSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdGlmICggaXMuYS5zdHJpbmcoIF92YWx1ZSApICkge1xuXHRcdHZhbHVlID0ge1xuXHRcdFx0dHlwZTogX3ZhbHVlXG5cdFx0fTtcblx0fSBlbHNlIGlmICggaXMuYW4ub2JqZWN0KCBfdmFsdWUgKSAmJiBfdmFsdWVbICdfX21vZGVsJyBdID09PSB0cnVlICkge1xuXHRcdHZhbHVlID0ge1xuXHRcdFx0dHlwZTogJ21vZGVsJyxcblx0XHRcdGRlZmF1bHQ6IF92YWx1ZVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR2YWx1ZSA9IF92YWx1ZTtcblx0fVxuXG5cdHJldHVybiBtZXJnZSgge1xuXHRcdG5hbWU6IF9rZXkgfHwgJycsXG5cdFx0dHlwZTogJycsXG5cdFx0ZGVmYXVsdDogbnVsbCxcblx0XHRvcHRpb25hbDogZmFsc2Vcblx0fSwgdmFsdWUgKTtcbn07XG5cbmV4cG9ydHMuZ2V0UHJvcGVydHkgPSBmdW5jdGlvbiAoIF9rZXkgKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX19kYXRhWyBfa2V5IF07XG5cdH1cbn07XG5cbmV4cG9ydHMuc2V0QnVzeSA9IGZ1bmN0aW9uICggX3NlbGYgKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0X3NlbGYuYnVzeSA9IHRydWU7XG5cdH1cbn07XG5cbmV4cG9ydHMuc2V0UHJvcGVydHkgPSBmdW5jdGlvbiAoIF9rZXkgKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoIF92YWx1ZSApIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRhdHRyaWJ1dGVzID0gc2VsZi5fX2F0dHJpYnV0ZXNbIF9rZXkgXSxcblx0XHRcdHZhbHVlID0gYXR0cmlidXRlcy50eXBlID8gY2FzdCggX3ZhbHVlLCBhdHRyaWJ1dGVzLnR5cGUsIGF0dHJpYnV0ZXNbICdkZWZhdWx0JyBdICkgOiBfdmFsdWU7XG5cblx0XHRpZiAoIHNlbGYuX19kYXRhWyBfa2V5IF0gIT09IHZhbHVlICkge1xuXHRcdFx0c2VsZi5lbWl0KCAnY2hhbmdlJywgc2VsZi5fX2RhdGFbIF9rZXkgXSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHRzZWxmLl9fZGF0YVsgX2tleSBdID0gdmFsdWU7XG5cdH1cbn07XG5cbmV4cG9ydHMudW5zZXRCdXN5ID0gZnVuY3Rpb24gKCBfc2VsZiApIHtcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRfc2VsZi5idXN5ID0gZmFsc2U7XG5cdH1cbn07XG5cbmV4cG9ydHMubm9vcCA9IGZ1bmN0aW9uICgpIHt9OyIsInZhciBpcyA9IHJlcXVpcmUoICdzYy1pcycgKSxcblx0Y2FzdCA9IHJlcXVpcmUoICdzYy1jYXN0JyApLFxuXHRoYXNLZXkgPSByZXF1aXJlKCAnc2MtaGFza2V5JyApLFxuXHRoZWxwZXJzID0gcmVxdWlyZSggJy4vaGVscGVycycgKSxcblx0bWVyZ2UgPSByZXF1aXJlKCAnc2MtbWVyZ2UnICksXG5cdGVtaXR0ZXIgPSByZXF1aXJlKCAnZW1pdHRlci1jb21wb25lbnQnICksXG5cdHVzZWlmeSA9IHJlcXVpcmUoICdzYy11c2VpZnknICksXG5cdHJlcXVlc3QgPSByZXF1aXJlKCAnLi9yZXF1ZXN0JyApLFxuXHRvYnNlcnZhYmxlQXJyYXkgPSByZXF1aXJlKCAnc2ctb2JzZXJ2YWJsZS1hcnJheScgKTtcblxudmFyIE1vZGVsID0gZnVuY3Rpb24gKCBfbmFtZSwgX3Byb3BlcnRpZXMgKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRwcm9wZXJ0aWVzID0gaXMuYW4ub2JqZWN0KCBfcHJvcGVydGllcyApID8gX3Byb3BlcnRpZXMgOiB7fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyggc2VsZiwge1xuXHRcdF9fbW9kZWw6IHtcblx0XHRcdHZhbHVlOiB0cnVlXG5cdFx0fSxcblx0XHRfX2F0dHJpYnV0ZXM6IHtcblx0XHRcdHZhbHVlOiB7fSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRfX2Jhc2VVcmw6IHtcblx0XHRcdHZhbHVlOiBjYXN0KCBwcm9wZXJ0aWVzWyAnYmFzZVVybCcgXSwgJ3N0cmluZycsICcnICksXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0X19kYXRhOiB7XG5cdFx0XHR2YWx1ZToge30sXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0X19kZXN0cm95ZWQ6IHtcblx0XHRcdHZhbHVlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRfX2hlYWRlcnM6IHtcblx0XHRcdHZhbHVlOiBjYXN0KCBwcm9wZXJ0aWVzWyAnaGVhZGVycycgXSwgJ29iamVjdCcsIHt9ICksXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0X19rZXk6IHtcblx0XHRcdHZhbHVlOiBjYXN0KCBwcm9wZXJ0aWVzWyAna2V5JyBdLCAnc3RyaW5nJywgJ2lkJyApIHx8ICdpZCcsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0X19rZXlsZXNzOiB7XG5cdFx0XHR2YWx1ZTogcHJvcGVydGllc1sgJ2tleWxlc3MnIF0gPT09IHRydWVcblx0XHR9LFxuXHRcdF9fbmFtZToge1xuXHRcdFx0dmFsdWU6IF9uYW1lIHx8IHByb3BlcnRpZXNbICduYW1lJyBdIHx8ICcnXG5cdFx0fSxcblx0XHRfX3VybDoge1xuXHRcdFx0dmFsdWU6IGNhc3QoIHByb3BlcnRpZXNbICd1cmwnIF0sICdzdHJpbmcnLCAnJyApLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9LFxuXHRcdGJ1c3k6IHtcblx0XHRcdHZhbHVlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fVxuXHR9ICk7XG5cblx0aWYgKCAhcHJvcGVydGllc1sgJ2tleWxlc3MnIF0gKSB7XG5cdFx0c2VsZi4kcHJvcGVydHkoIHNlbGYuX19rZXkgKTtcblx0fVxuXG5cdE9iamVjdC5rZXlzKCBjYXN0KCBwcm9wZXJ0aWVzWyAncHJvcGVydGllcycgXSwgJ29iamVjdCcsIHt9ICkgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9rZXkgKSB7XG5cdFx0c2VsZi4kcHJvcGVydHkoIF9rZXksIHByb3BlcnRpZXNbICdwcm9wZXJ0aWVzJyBdWyBfa2V5IF0gKTtcblx0fSApO1xuXG5cdHNlbGYub24oICdwcmVzYXZlJywgaGVscGVycy5zZXRCdXN5KCBzZWxmICkgKTtcblx0c2VsZi5vbiggJ3NhdmUnLCBoZWxwZXJzLnVuc2V0QnVzeSggc2VsZiApICk7XG5cblx0c2VsZi5vbiggJ3ByZWRlc3Ryb3knLCBoZWxwZXJzLnNldEJ1c3koIHNlbGYgKSApO1xuXHRzZWxmLm9uKCAnZGVzdHJveScsIGhlbHBlcnMudW5zZXRCdXN5KCBzZWxmICkgKTtcblxuXHRzZWxmLm9uKCAncHJlZ2V0JywgaGVscGVycy5zZXRCdXN5KCBzZWxmICkgKTtcblx0c2VsZi5vbiggJ2dldCcsIGhlbHBlcnMudW5zZXRCdXN5KCBzZWxmICkgKTtcblxufTtcblxuTW9kZWwucHJvdG90eXBlLiRiYXNlVXJsID0gZnVuY3Rpb24gKCBfYmFzZSApIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdHVybCA9IGNhc3QoIF9iYXNlLCAnc3RyaW5nJywgc2VsZi5fX2Jhc2VVcmwgfHwgJycgKTtcblxuXHRzZWxmLl9fYmFzZVVybCA9IHVybC50cmltKCkucmVwbGFjZSggLyhcXC98XFxzKSskL2csICcnICk7XG5cblx0cmV0dXJuIGlzLm5vdC5hLnN0cmluZyggX2Jhc2UgKSA/IHNlbGYuX19iYXNlVXJsIDogc2VsZjtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS4kY29sbGVjdGlvbiA9IGZ1bmN0aW9uICggX3F1ZXJ5ICkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0dXJsID0gc2VsZi4kdXJsKCksXG5cdFx0bWV0aG9kID0gJ2dldCcsXG5cdFx0cXVlcnkgPSBpcy5hbi5vYmplY3QoIF9xdWVyeSApID8gX3F1ZXJ5IDoge30sXG5cdFx0Y2FsbGJhY2sgPSBpcy5hLmZ1bmMoIF9xdWVyeSApID8gX3F1ZXJ5IDogaXMuYS5mdW5jKCBfY2FsbGJhY2sgKSA/IF9jYWxsYmFjayA6IGhlbHBlcnMubm9vcDtcblxuXHRzZWxmLmVtaXQoICdwcmVjb2xsZWN0aW9uJywge1xuXHRcdG1vZGVsOiBzZWxmLFxuXHRcdG1ldGhvZDogbWV0aG9kLFxuXHRcdHF1ZXJ5OiBxdWVyeSxcblx0XHR1cmw6IHVybCxcblx0XHRjYWxsYmFjazogY2FsbGJhY2tcblx0fSApO1xuXG5cdHJlcXVlc3QoIHNlbGYsIHF1ZXJ5LCBtZXRob2QsIHVybCwgZnVuY3Rpb24gKCBfZXJyb3IsIF9yZXMgKSB7XG5cdFx0c2VsZi5lbWl0KCAnY29sbGVjdGlvbicsIF9lcnJvciwgX3JlcyApO1xuXHRcdGNhbGxiYWNrLmFwcGx5KCBzZWxmLCBhcmd1bWVudHMgKTtcblx0fSApO1xuXG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAoIF9jYWxsYmFjayApIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGlzRGlydHkgPSBzZWxmLiRpc0RpcnR5KCksXG5cdFx0ZGF0YSA9IHNlbGYuJGpzb24oKSxcblx0XHR1cmwgPSBzZWxmLiR1cmwoKSArICggc2VsZi5fX2tleWxlc3MgPyAnJyA6ICcvJyArIHNlbGZbIHNlbGYuX19rZXkgXSApLFxuXHRcdG1ldGhvZCA9ICdkZWxldGUnLFxuXHRcdGNhbGxiYWNrID0gaXMuYS5mdW5jKCBfY2FsbGJhY2sgKSA/IF9jYWxsYmFjayA6IGhlbHBlcnMubm9vcDtcblxuXHRzZWxmLmVtaXQoICdwcmVkZXN0cm95Jywge1xuXHRcdG1vZGVsOiBzZWxmLFxuXHRcdGRhdGE6IGRhdGEsXG5cdFx0bWV0aG9kOiBtZXRob2QsXG5cdFx0dXJsOiB1cmwsXG5cdFx0Y2FsbGJhY2s6IGNhbGxiYWNrXG5cdH0gKTtcblxuXHRpZiAoICFpc0RpcnR5ICkge1xuXHRcdHJlcXVlc3QoIHNlbGYsIGRhdGEsIG1ldGhvZCwgdXJsLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHNlbGYuZW1pdCggJ2Rlc3Ryb3knLCBzZWxmICk7XG5cblx0XHRcdHNlbGYuX19kZXN0cm95ZWQgPSB0cnVlO1xuXHRcdFx0Y2FsbGJhY2suYXBwbHkoIHNlbGYsIGFyZ3VtZW50cyApO1xuXHRcdH0gKTtcblx0fSBlbHNlIHtcblx0XHRjYWxsYmFjay5hcHBseSggc2VsZiwgWyBuZXcgRXJyb3IoICdUaGlzIG1vZGVsIGNhbm5vdCBiZSBkZXN0cm95ZWQgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gc2F2ZWQgdG8gdGhlIHNlcnZlciB5ZXQuJyApIF0gKTtcblx0fVxuXG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJGRhdGEgPSBmdW5jdGlvbiAoIF9kYXRhICkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0ZGF0YSA9IGlzLm9iamVjdCggX2RhdGEgKSA/IF9kYXRhIDoge307XG5cblx0T2JqZWN0LmtleXMoIGRhdGEgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9rZXkgKSB7XG5cdFx0aWYgKCBzZWxmLl9fYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSggX2tleSApICkge1xuXHRcdFx0aWYgKCBpcy5hbi5hcnJheSggZGF0YVsgX2tleSBdICkgJiYgaGFzS2V5KCBzZWxmLl9fYXR0cmlidXRlc1sgX2tleSBdLCAnYXJyYXlPZkFUeXBlJywgJ2Jvb2xlYW4nICkgJiYgc2VsZi5fX2F0dHJpYnV0ZXNbIF9rZXkgXS5hcnJheU9mQVR5cGUgPT09IHRydWUgKSB7XG5cdFx0XHRcdGRhdGFbIF9rZXkgXS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9tb2RlbCApIHtcblx0XHRcdFx0XHRzZWxmWyBfa2V5IF0ucHVzaCggX21vZGVsICk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH0gZWxzZSBpZiAoIGlzLmEub2JqZWN0KCBkYXRhWyBfa2V5IF0gKSAmJiBzZWxmWyBfa2V5IF0gaW5zdGFuY2VvZiBNb2RlbCApIHtcblx0XHRcdFx0c2VsZlsgX2tleSBdLiRkYXRhKCBkYXRhWyBfa2V5IF0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGZbIF9rZXkgXSA9IGRhdGFbIF9rZXkgXTtcblx0XHRcdH1cblx0XHR9XG5cdH0gKTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS4kY2xvbmUgPSBmdW5jdGlvbiAoIF9kYXRhICkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0ZGF0YSA9IGNhc3QoIF9kYXRhLCAnb2JqZWN0Jywge30gKSxcblx0XHRuZXdNb2RlbCA9IG5ldyBNb2RlbCggc2VsZi5fX25hbWUsIHtcblx0XHRcdGJhc2VVcmw6IHNlbGYuX19iYXNlVXJsLFxuXHRcdFx0aGVhZGVyczogc2VsZi5fX2hlYWRlcnMsXG5cdFx0XHRrZXk6IHNlbGYuX19rZXksXG5cdFx0XHRrZXlsZXNzOiBzZWxmLl9fa2V5bGVzcyxcblx0XHRcdHVybDogc2VsZi5fX3VybFxuXHRcdH0gKTtcblxuXHRPYmplY3Qua2V5cyggc2VsZi5fX2F0dHJpYnV0ZXMgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9wcm9wZXJ0eUtleSApIHtcblx0XHRuZXdNb2RlbC4kcHJvcGVydHkoIF9wcm9wZXJ0eUtleSwgbWVyZ2UoIHNlbGYuX19hdHRyaWJ1dGVzWyBfcHJvcGVydHlLZXkgXSApICk7XG5cdFx0bmV3TW9kZWxbIF9wcm9wZXJ0eUtleSBdID0gZGF0YVsgX3Byb3BlcnR5S2V5IF1cblx0fSApO1xuXG5cdHJldHVybiBuZXdNb2RlbDtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS4kZ2V0ID0gZnVuY3Rpb24gKCBfcXVlcnksIF9jYWxsYmFjayApIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdHVybCA9IHNlbGYuJHVybCgpLFxuXHRcdG1ldGhvZCA9ICdnZXQnLFxuXHRcdHF1ZXJ5ID0gaXMuYW4ub2JqZWN0KCBfcXVlcnkgKSA/IF9xdWVyeSA6IHt9LFxuXHRcdGNhbGxiYWNrID0gaXMuYS5mdW5jKCBfcXVlcnkgKSA/IF9xdWVyeSA6IGlzLmEuZnVuYyggX2NhbGxiYWNrICkgPyBfY2FsbGJhY2sgOiBoZWxwZXJzLm5vb3A7XG5cblx0c2VsZi5lbWl0KCAncHJlZ2V0Jywge1xuXHRcdG1vZGVsOiBzZWxmLFxuXHRcdG1ldGhvZDogbWV0aG9kLFxuXHRcdHF1ZXJ5OiBxdWVyeSxcblx0XHR1cmw6IHVybCxcblx0XHRjYWxsYmFjazogY2FsbGJhY2tcblx0fSApO1xuXG5cdHJlcXVlc3QoIHNlbGYsIHF1ZXJ5LCBtZXRob2QsIHVybCwgZnVuY3Rpb24gKCBfZXJyb3IsIF9yZXMgKSB7XG5cdFx0c2VsZi5lbWl0KCAnZ2V0JywgX2Vycm9yLCBfcmVzICk7XG5cdFx0Y2FsbGJhY2suYXBwbHkoIHNlbGYsIGFyZ3VtZW50cyApO1xuXHR9ICk7XG5cbn07XG5cbk1vZGVsLnByb3RvdHlwZS4kaGVhZGVycyA9IGZ1bmN0aW9uICggX2hlYWRlcnMgKSB7XG5cdHRoaXMuX19oZWFkZXJzID0gaXMuYW4ub2JqZWN0KCBfaGVhZGVycyApID8gX2hlYWRlcnMgOiB0aGlzLl9faGVhZGVycztcblx0cmV0dXJuIGlzLm5vdC5hbi5vYmplY3QoIF9oZWFkZXJzICkgPyB0aGlzLl9faGVhZGVycyA6IHRoaXM7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJGlzRGlydHkgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBpcy5lbXB0eSggdGhpc1sgdGhpcy5fX2tleSBdICk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJGlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRpc1ZhbGlkID0gdHJ1ZTtcblxuXHRPYmplY3Qua2V5cyggc2VsZi5fX2F0dHJpYnV0ZXMgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9rZXkgKSB7XG5cblx0XHRpZiAoIHNlbGYuJGlzRGlydHkoKSAmJiBfa2V5ID09PSBzZWxmLl9fa2V5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB2YWx1ZSA9IHNlbGZbIF9rZXkgXSxcblx0XHRcdGF0dHJpYnV0ZXMgPSBzZWxmLl9fYXR0cmlidXRlc1sgX2tleSBdLFxuXHRcdFx0dHlwZSA9IGF0dHJpYnV0ZXMudHlwZSxcblx0XHRcdGFycmF5T2ZBVHlwZSA9IGhhc0tleSggYXR0cmlidXRlcywgJ2FycmF5T2ZBVHlwZScsICdib29sZWFuJyApID8gYXR0cmlidXRlcy5hcnJheU9mQVR5cGUgPT09IHRydWUgOiBmYWxzZSxcblx0XHRcdGlzUmVxdWlyZWQgPSBhdHRyaWJ1dGVzLm9wdGlvbmFsICE9PSB0cnVlLFxuXHRcdFx0aXNOdWxsT3JVbmRlZmluZWQgPSBzZWxmLl9fa2V5bGVzcyA/IGZhbHNlIDogYXJyYXlPZkFUeXBlID8gdmFsdWUubGVuZ3RoID09PSAwIDogaXMubnVsbE9yVW5kZWZpbmVkKCB2YWx1ZSApLFxuXHRcdFx0dHlwZUlzV3JvbmcgPSBpcy5ub3QuZW1wdHkoIHR5cGUgKSAmJiBpcy5hLnN0cmluZyggdHlwZSApID8gaXMubm90LmFbIHR5cGUgXSggdmFsdWUgKSA6IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5cdFx0aWYgKCBhcnJheU9mQVR5cGUgJiYgaXMubm90LmVtcHR5KCB2YWx1ZSApICYmIHZhbHVlWyAwIF0gaW5zdGFuY2VvZiBNb2RlbCApIHtcblx0XHRcdHZhbHVlLmZvckVhY2goIGZ1bmN0aW9uICggX2l0ZW0gKSB7XG5cdFx0XHRcdGlmICggaXNWYWxpZCAmJiBfaXRlbS4kaXNWYWxpZCgpID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIGlzVmFsaWQgJiYgaXNSZXF1aXJlZCAmJiB0eXBlSXNXcm9uZyApIHtcblx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHR9XG5cblx0fSApO1xuXG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuTW9kZWwucHJvdG90eXBlLiRqc29uID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0ZGF0YSA9IHNlbGYuX19kYXRhLFxuXHRcdGpzb24gPSB7fTtcblxuXHRPYmplY3Qua2V5cyggZGF0YSApLmZvckVhY2goIGZ1bmN0aW9uICggX2tleSApIHtcblx0XHRpZiAoIGlzLmFuLmFycmF5KCBkYXRhWyBfa2V5IF0gKSAmJiBkYXRhWyBfa2V5IF1bIDAgXSBpbnN0YW5jZW9mIE1vZGVsICkge1xuXHRcdFx0anNvblsgX2tleSBdID0gW107XG5cdFx0XHRkYXRhWyBfa2V5IF0uZm9yRWFjaCggZnVuY3Rpb24gKCBfbW9kZWwgKSB7XG5cdFx0XHRcdGpzb25bIF9rZXkgXS5wdXNoKCBfbW9kZWwuJGpzb24oKSApO1xuXHRcdFx0fSApO1xuXHRcdH0gZWxzZSBpZiAoIGlzLm5vdC5hbi5vYmplY3QoIGRhdGFbIF9rZXkgXSApICkge1xuXHRcdFx0anNvblsgX2tleSBdID0gZGF0YVsgX2tleSBdO1xuXHRcdH0gZWxzZSBpZiAoIGRhdGFbIF9rZXkgXSBpbnN0YW5jZW9mIE1vZGVsICkge1xuXHRcdFx0anNvblsgX2tleSBdID0gZGF0YVsgX2tleSBdLiRqc29uKCk7XG5cdFx0fVxuXHR9ICk7XG5cblx0cmV0dXJuIGpzb247XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJHByb3BlcnR5ID0gZnVuY3Rpb24gKCBfa2V5LCBfdmFsdWUgKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRhdHRyaWJ1dGVzID0gbmV3IGhlbHBlcnMuYXR0cmlidXRlcyggX2tleSwgX3ZhbHVlICksXG5cdFx0ZXhpc3RpbmdWYWx1ZSA9IHNlbGZbIF9rZXkgXSxcblx0XHRhdHRyaWJ1dGVUeXBlSXNBbkluc3RhbnRpYXRlZE1vZGVsID0gaXMuYS5zdHJpbmcoIGF0dHJpYnV0ZXMudHlwZSApICYmIC9tb2RlbC8udGVzdCggYXR0cmlidXRlcy50eXBlICksXG5cdFx0YXR0cmlidXRlVHlwZUlzQW5BcnJheSA9IGlzLmFuLmFycmF5KCBhdHRyaWJ1dGVzLnR5cGUgKSxcblx0XHR2YWx1ZUlzQW5BcnJheU1vZGVsID0gaXMuYW4uYXJyYXkoIF92YWx1ZSApICYmIGhhc0tleSggX3ZhbHVlWyAwIF0sICdwcm9wZXJ0aWVzJywgJ29iamVjdCcgKSxcblx0XHR2YWx1ZUlzQW5BcnJheVN0cmluZyA9IGlzLmFuLmFycmF5KCBfdmFsdWUgKSAmJiBpcy5hLnN0cmluZyggX3ZhbHVlWyAwIF0gKSxcblx0XHRhdHRyaWJ1dGVBcnJheVR5cGVJc0FNb2RlbCA9IGF0dHJpYnV0ZVR5cGVJc0FuQXJyYXkgJiYgaGFzS2V5KCBhdHRyaWJ1dGVzLnR5cGVbIDAgXSwgJ3Byb3BlcnRpZXMnLCAnb2JqZWN0JyApLFxuXHRcdGF0dHJpYnV0ZUFycmF5VHlwZUlzQVN0cmluZyA9IGF0dHJpYnV0ZVR5cGVJc0FuQXJyYXkgJiYgaXMuYS5zdHJpbmcoIGF0dHJpYnV0ZXMudHlwZVsgMCBdICkgJiYgaXMubm90LmVtcHR5KCBhdHRyaWJ1dGVzLnR5cGVbIDAgXSApLFxuXHRcdHZhbHVlSXNBU3RhdGljTW9kZWwgPSBoYXNLZXkoIF92YWx1ZSwgJ3Byb3BlcnRpZXMnLCAnb2JqZWN0JyApO1xuXG5cdGlmICggIXNlbGYuaGFzT3duUHJvcGVydHkoIF9rZXkgKSB8fCAhc2VsZi5fX2F0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoIF9rZXkgKSApIHtcblxuXHRcdGlmICggdmFsdWVJc0FuQXJyYXlNb2RlbCB8fCB2YWx1ZUlzQW5BcnJheVN0cmluZyApIHtcblx0XHRcdGF0dHJpYnV0ZXMudHlwZSA9IF92YWx1ZTtcblx0XHRcdGF0dHJpYnV0ZUFycmF5VHlwZUlzQU1vZGVsID0gdmFsdWVJc0FuQXJyYXlNb2RlbDtcblx0XHRcdGF0dHJpYnV0ZUFycmF5VHlwZUlzQVN0cmluZyA9IHZhbHVlSXNBbkFycmF5U3RyaW5nO1xuXHRcdFx0YXR0cmlidXRlVHlwZUlzQW5BcnJheSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBhdHRyaWJ1dGVUeXBlSXNBbkluc3RhbnRpYXRlZE1vZGVsICkge1xuXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHNlbGYsIF9rZXksIHtcblx0XHRcdFx0dmFsdWU6IGF0dHJpYnV0ZXNbICdkZWZhdWx0JyBdLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0fSApO1xuXG5cdFx0XHRzZWxmLl9fZGF0YVsgX2tleSBdID0gc2VsZlsgX2tleSBdO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWVJc0FTdGF0aWNNb2RlbCApIHtcblxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBzZWxmLCBfa2V5LCB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgTW9kZWwoIF92YWx1ZS5uYW1lLCBfdmFsdWUgKSxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdH0gKTtcblxuXHRcdFx0c2VsZi5fX2RhdGFbIF9rZXkgXSA9IHNlbGZbIF9rZXkgXTtcblxuXHRcdH0gZWxzZSBpZiAoIGF0dHJpYnV0ZVR5cGVJc0FuQXJyYXkgKSB7XG5cblx0XHRcdHZhciBhcnJheSA9IG9ic2VydmFibGVBcnJheSggW10gKSxcblx0XHRcdFx0YXR0cmlidXRlVHlwZSA9IGF0dHJpYnV0ZUFycmF5VHlwZUlzQVN0cmluZyB8fCBhdHRyaWJ1dGVBcnJheVR5cGVJc0FNb2RlbCA/IGF0dHJpYnV0ZXMudHlwZVsgMCBdIDogJyonO1xuXG5cdFx0XHRhdHRyaWJ1dGVzLmFycmF5T2ZBVHlwZSA9IHRydWU7XG5cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggc2VsZiwgX2tleSwge1xuXHRcdFx0XHR2YWx1ZTogYXJyYXksXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0gKTtcblxuXHRcdFx0c2VsZi5fX2RhdGFbIF9rZXkgXSA9IHNlbGZbIF9rZXkgXTtcblxuXHRcdFx0WyAncHVzaCcsICd1bnNoaWZ0JyBdLmZvckVhY2goIGZ1bmN0aW9uICggX21ldGhvZCApIHtcblx0XHRcdFx0YXJyYXkub24oIF9tZXRob2QsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblx0XHRcdFx0XHRcdHZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdGFyZ3MuZm9yRWFjaCggZnVuY3Rpb24gKCBfaXRlbSApIHtcblx0XHRcdFx0XHRcdGlmICggYXR0cmlidXRlQXJyYXlUeXBlSXNBTW9kZWwgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBtb2RlbCA9IG5ldyBNb2RlbCggYXR0cmlidXRlVHlwZVsgJ25hbWUnIF0sIGF0dHJpYnV0ZVR5cGUgKSxcblx0XHRcdFx0XHRcdFx0XHRkYXRhID0gaXMuYW4ub2JqZWN0KCBfaXRlbSApID8gX2l0ZW0gOiBhdHRyaWJ1dGVzWyAnZGVmYXVsdCcgXTtcblx0XHRcdFx0XHRcdFx0bW9kZWwuJGRhdGEoIGRhdGEgKTtcblx0XHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIG1vZGVsICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YWx1ZXMucHVzaCggY2FzdCggX2l0ZW0sIGF0dHJpYnV0ZVR5cGUsIGF0dHJpYnV0ZXNbICdkZWZhdWx0JyBdICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0cmV0dXJuIGFycmF5WyAnX18nICsgX21ldGhvZCBdLmFwcGx5KCBhcnJheSwgdmFsdWVzICk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH0gKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHNlbGYsIF9rZXksIHtcblx0XHRcdFx0Z2V0OiBoZWxwZXJzLmdldFByb3BlcnR5KCBfa2V5ICksXG5cdFx0XHRcdHNldDogaGVscGVycy5zZXRQcm9wZXJ0eSggX2tleSApLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0c2VsZi5fX2F0dHJpYnV0ZXNbIF9rZXkgXSA9IGF0dHJpYnV0ZXM7XG5cdH1cblxuXHRpZiAoIGV4aXN0aW5nVmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRzZWxmWyBfa2V5IF0gPSBleGlzdGluZ1ZhbHVlO1xuXHR9IGVsc2UgaWYgKCBpcy5lbXB0eSggc2VsZlsgX2tleSBdICkgJiYgYXR0cmlidXRlcy5vcHRpb25hbCA9PT0gZmFsc2UgJiYgaXMubm90Lm51bGxPclVuZGVmaW5lZCggYXR0cmlidXRlc1sgJ2RlZmF1bHQnIF0gKSApIHtcblx0XHRzZWxmWyBfa2V5IF0gPSBhdHRyaWJ1dGVzWyAnZGVmYXVsdCcgXTtcblx0fSBlbHNlIGlmICggaXMuZW1wdHkoIHNlbGZbIF9rZXkgXSApICYmIGF0dHJpYnV0ZXMub3B0aW9uYWwgPT09IGZhbHNlICkge1xuXHRcdGlmICggYXR0cmlidXRlVHlwZUlzQW5BcnJheSB8fCBhdHRyaWJ1dGVUeXBlSXNBbkluc3RhbnRpYXRlZE1vZGVsICkge1xuXHRcdFx0c2VsZi5fX2RhdGFbIF9rZXkgXSA9IHNlbGZbIF9rZXkgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZi5fX2RhdGFbIF9rZXkgXSA9IGlzLmVtcHR5KCBhdHRyaWJ1dGVzLnR5cGUgKSA/IHVuZGVmaW5lZCA6IGNhc3QoIHVuZGVmaW5lZCwgYXR0cmlidXRlcy50eXBlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoIF9jYWxsYmFjayApIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGVycm9yID0gbnVsbCxcblx0XHRpc0RpcnR5ID0gc2VsZi4kaXNEaXJ0eSgpLFxuXHRcdGRhdGEgPSBzZWxmLiRqc29uKCksXG5cdFx0dXJsID0gc2VsZi4kdXJsKCkgKyAoICFpc0RpcnR5ICYmICFzZWxmLl9fa2V5bGVzcyA/ICcvJyArIHNlbGZbIHNlbGYuX19rZXkgXSA6ICcnICksXG5cdFx0bWV0aG9kID0gaXNEaXJ0eSA/ICdwb3N0JyA6ICdwdXQnLFxuXHRcdGNhbGxiYWNrID0gaXMuYS5mdW5jKCBfY2FsbGJhY2sgKSA/IF9jYWxsYmFjayA6IGhlbHBlcnMubm9vcDtcblxuXHRzZWxmLmVtaXQoICdwcmVzYXZlJywge1xuXHRcdG1vZGVsOiBzZWxmLFxuXHRcdGRhdGE6IGRhdGEsXG5cdFx0bWV0aG9kOiBtZXRob2QsXG5cdFx0dXJsOiB1cmwsXG5cdFx0Y2FsbGJhY2s6IGNhbGxiYWNrXG5cdH0gKTtcblxuXHRyZXF1ZXN0KCBzZWxmLCBkYXRhLCBtZXRob2QsIHVybCwgZnVuY3Rpb24gKCBfZXJyb3IsIF9yZXMgKSB7XG5cdFx0c2VsZi5lbWl0KCAnc2F2ZScsIF9lcnJvciwgX3JlcyApO1xuXHRcdGNhbGxiYWNrLmFwcGx5KCBzZWxmLCBhcmd1bWVudHMgKTtcblx0fSApO1xuXG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuJHVybCA9IGZ1bmN0aW9uICggX3VybCApIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGJhc2UgPSBpcy5lbXB0eSggc2VsZi5fX2Jhc2VVcmwgKSA/ICcnIDogc2VsZi5fX2Jhc2VVcmwsXG5cdFx0bmFtZSA9IGlzLmVtcHR5KCBzZWxmLl9fbmFtZSApID8gJycgOiAnLycgKyBzZWxmLl9fbmFtZS50cmltKCkucmVwbGFjZSggL15cXC8vLCAnJyApLFxuXHRcdHVybCA9IF91cmwgfHwgc2VsZi5fX3VybCB8fCAnJyxcblx0XHRlbmRwb2ludCA9IGJhc2UgKyBuYW1lICsgKCBpcy5lbXB0eSggdXJsICkgPyAnJyA6ICcvJyArIHVybC50cmltKCkucmVwbGFjZSggL15cXC8vLCAnJyApICk7XG5cblx0c2VsZi5fX3VybCA9IHVybC50cmltKCkucmVwbGFjZSggL15cXC8vLCAnJyApO1xuXG5cdHJldHVybiBpcy5ub3QuYS5zdHJpbmcoIF91cmwgKSA/IGVuZHBvaW50IDogc2VsZjtcbn07XG5cbmVtaXR0ZXIoIE1vZGVsLnByb3RvdHlwZSApO1xudXNlaWZ5KCBNb2RlbCApO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBNb2RlbDtcblxuLyoqXG4gKiBFeHBvc2UgYnVpbHQgaW4gbWlkZGxld2FyZVxuICovXG5leHBvcnRzLnNjaGVtYSA9IHJlcXVpcmUoICcuL21pZGRsZXdhcmUvc2NoZW1hLm1pZGRsZXdhcmUnICk7XG5leHBvcnRzLmFqYXggPSByZXF1aXJlKCAnLi9taWRkbGV3YXJlL2FqYXgubWlkZGxld2FyZScgKTtcbiIsInZhciBzdXBlcmFnZW50ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICksXG5cdGNhc3QgPSByZXF1aXJlKCAnc2MtY2FzdCcgKSxcblx0aXMgPSByZXF1aXJlKCAnc2MtaXMnICksXG5cdGhhc0tleSA9IHJlcXVpcmUoICdzYy1oYXNrZXknICk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCBfbW9kZWwsIF9kYXRhLCBfbWV0aG9kLCBfdXJsLCBfY2FsbGJhY2sgKSB7XG5cdHZhciBtZXRob2QgPSAvZGVsZXRlL2kudGVzdCggX21ldGhvZCApID8gJ2RlbCcgOiBfbWV0aG9kLFxuXHRcdG1vZGVsID0gX21vZGVsLFxuXHRcdGRhdGEgPSBjYXN0KCBfZGF0YSwgJ29iamVjdCcsIHt9ICksXG5cdFx0dXJsID0gX3VybCxcblx0XHRlcnJvcjtcblxuXHRpZiAoIC9nZXQvaS50ZXN0KCBtZXRob2QgKSAmJiBoYXNLZXkoIGRhdGEsIG1vZGVsLl9fa2V5ICkgJiYgbmV3IFJlZ0V4cCggZGF0YVsgbW9kZWwuX19rZXkgXSApLnRlc3QoIHVybCApID09PSBmYWxzZSApIHtcblx0XHR1cmwgKz0gJy8nICsgZGF0YVsgbW9kZWwuX19rZXkgXTtcblx0XHRkZWxldGUgZGF0YVsgbW9kZWwuX19rZXkgXTtcblx0fVxuXG5cdHN1cGVyYWdlbnRbIG1ldGhvZCBdKCB1cmwgKVsgL2dldC9pLnRlc3QoIG1ldGhvZCApID8gJ3F1ZXJ5JyA6ICdzZW5kJyBdKCBkYXRhIClcblx0XHQuc2V0KCBtb2RlbC4kaGVhZGVycygpIClcblx0XHQudHlwZSggJ2pzb24nIClcblx0XHQuYWNjZXB0KCAnanNvbicgKVxuXHRcdC5lbmQoIGZ1bmN0aW9uICggX2Vycm9yLCBfcmVzICkge1xuXHRcdFx0dmFyIHJlcyA9IGlzLmFuLm9iamVjdCggX3JlcyApID8gX3JlcyA6IHt9LFxuXHRcdFx0XHRib2R5ID0gaGFzS2V5KCBfcmVzLCAnYm9keScgKSAmJiAoIGlzLm9iamVjdCggX3Jlcy5ib2R5ICkgfHwgaXMuYXJyYXkoIF9yZXMuYm9keSApICkgPyBfcmVzLmJvZHkgOiBudWxsO1xuXG5cdFx0XHRpZiAoIHJlc1sgJ29rJyBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRlcnJvciA9IG5ldyBFcnJvciggJ1RoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgd2FzIG5vdCBPSycgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBib2R5ID09PSBudWxsICkge1xuXHRcdFx0XHRlcnJvciA9IG5ldyBFcnJvciggJ1RoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgY29udGFpbmVkIGFuIGVtcHR5IGJvZHknICk7XG5cdFx0XHR9XG5cblx0XHRcdF9jYWxsYmFjayAmJiBfY2FsbGJhY2soIGVycm9yLCBib2R5ICk7XG5cblx0XHR9ICk7XG5cbn0iLCJ2YXIgc3VwZXJhZ2VudCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApLFxuXHRpcyA9IHJlcXVpcmUoICdzYy1pcycgKSxcblx0aGFzS2V5ID0gcmVxdWlyZSggJ3NjLWhhc2tleScgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoIF9tb2RlbCwgX2RhdGEsIF9tZXRob2QsIF91cmwsIF9uZXh0ICkge1xuXG5cdGlmICggIV9tb2RlbFsgJ19fc2NoZW1hJyBdICkge1xuXG5cdFx0c3VwZXJhZ2VudC5nZXQoIF9tb2RlbC4kdXJsKCkgKyAnL3NjaGVtYScgKS5lbmQoIGZ1bmN0aW9uICggX2Vycm9yLCBfcmVzICkge1xuXHRcdFx0dmFyIGVycm9yID0gX2Vycm9yLFxuXHRcdFx0XHRyZXMgPSBpcy5hbi5vYmplY3QoIF9yZXMgKSA/IF9yZXMgOiB7fSxcblx0XHRcdFx0Ym9keSA9IGhhc0tleSggX3JlcywgJ2JvZHknICkgJiYgaXMub2JqZWN0KCBfcmVzLmJvZHkgKSA/IF9yZXMuYm9keSA6IHt9O1xuXG5cdFx0XHRpZiAoICFlcnJvciAmJiByZXNbICdvaycgXSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0ZXJyb3IgPSBuZXcgRXJyb3IoICdUaGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHdhcyBub3QgT0snICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZXJyb3IgKSB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIF9tb2RlbCwgJ19fc2NoZW1hJywge1xuXHRcdFx0XHR2YWx1ZTogYm9keVxuXHRcdFx0fSApO1xuXG5cdFx0XHRPYmplY3Qua2V5cyggYm9keSApLmZvckVhY2goIGZ1bmN0aW9uICggX2tleSApIHtcblxuXHRcdFx0XHRpZiAoIGlzLmEuZnVuYyggX21vZGVsWyAnJCcgKyBfa2V5IF0gKSApIHtcblx0XHRcdFx0XHRfbW9kZWxbICckJyArIF9rZXkgXSggYm9keVsgX2tleSBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIF9rZXkgPT09ICdwcm9wZXJ0aWVzJyAmJiBpcy5vYmplY3QoIGJvZHlbIF9rZXkgXSApICkge1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKCBib2R5LnByb3BlcnRpZXMgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIF9wcm9wZXJ0eUtleSApIHtcblx0XHRcdFx0XHRcdHZhciBleGlzdGluZ1ZhbHVlID0gX21vZGVsWyBfcHJvcGVydHlLZXkgXTtcblx0XHRcdFx0XHRcdF9tb2RlbC4kcHJvcGVydHkoIF9wcm9wZXJ0eUtleSwgYm9keS5wcm9wZXJ0aWVzWyBfcHJvcGVydHlLZXkgXSApO1xuXHRcdFx0XHRcdFx0aWYgKCBpcy5ub3QuZW1wdHkoIGV4aXN0aW5nVmFsdWUgKSApIHtcblx0XHRcdFx0XHRcdFx0X21vZGVsWyBfcHJvcGVydHlLZXkgXSA9IGV4aXN0aW5nVmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gKTtcblxuXHRcdFx0X25leHQoIF9tb2RlbCwgX2RhdGEsIF9tZXRob2QsIF91cmwgKTtcblxuXHRcdH0gKTtcblxuXHR9IGVsc2Uge1xuXHRcdF9uZXh0KCBfbW9kZWwsIF9kYXRhLCBfbWV0aG9kLCBfdXJsICk7XG5cdH1cblxufTsiLCJ2YXIgaXMgPSByZXF1aXJlKCAnc2MtaXMnICksXG5cdGNhc3QgPSByZXF1aXJlKCAnc2MtY2FzdCcgKSxcblx0aGFzS2V5ID0gcmVxdWlyZSggJ3NjLWhhc2tleScgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoIF9tb2RlbCwgX2RhdGEsIF9tZXRob2QsIF91cmwsIF9jYWxsYmFjayApIHtcblx0dmFyIG1vZGVsID0gX21vZGVsLFxuXHRcdGl0ZW1zID0gW10sXG5cdFx0cmVzcG9uc2VTaG91bGRDb250YWluQW5JZCA9IGhhc0tleSggX2RhdGEsIG1vZGVsLl9fa2V5ICkgJiYgaXMubm90LmVtcHR5KCBfZGF0YVsgbW9kZWwuX19rZXkgXSApICYmIC9nZXQvLnRlc3QoIF9tZXRob2QgKSxcblx0XHRpc0RpcnR5ID0gbW9kZWwuJGlzRGlydHkoKTtcblxuXHRtb2RlbC5taWRkbGV3YXJlKCBmdW5jdGlvbiAoIF9lcnJvciwgX3Jlc3BvbnNlICkge1xuXHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXHRcdFx0ZXJyb3IgPSBfZXJyb3IgPT09IG1vZGVsID8gbnVsbCA6IGFyZ3Muc2hpZnQoKSxcblx0XHRcdHJlc3BvbnNlID0gYXJncy5zaGlmdCgpO1xuXG5cdFx0aWYgKCBlcnJvciAmJiAhKCBlcnJvciBpbnN0YW5jZW9mIEVycm9yICkgKSB7XG5cdFx0XHRlcnJvciA9IG5ldyBFcnJvciggJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQnICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhZXJyb3IgJiYgaXNEaXJ0eSAmJiBpcy5vYmplY3QoIHJlc3BvbnNlICkgJiYgKCByZXNwb25zZVNob3VsZENvbnRhaW5BbklkICYmICFoYXNLZXkoIHJlc3BvbnNlLCBtb2RlbC5fX2tleSApICkgKSB7XG5cdFx0XHRlcnJvciA9IG5ldyBFcnJvciggJ1RoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgZGlkIG5vdCBjb250YWluIGEgdmFsaWQgYCcgKyBtb2RlbC5fX2tleSArICdgJyApO1xuXHRcdH1cblxuXHRcdGlmICggIWVycm9yICYmIGlzRGlydHkgJiYgaXMub2JqZWN0KCByZXNwb25zZSApICkge1xuXHRcdFx0bW9kZWxbIG1vZGVsLl9fa2V5IF0gPSByZXNwb25zZVsgbW9kZWwuX19rZXkgXTtcblx0XHR9XG5cblx0XHRpZiAoICFlcnJvciApIHtcblx0XHRcdGlmICggaXMuYXJyYXkoIHJlc3BvbnNlICkgKSB7XG5cdFx0XHRcdHJlc3BvbnNlLmZvckVhY2goIGZ1bmN0aW9uICggX2RhdGEgKSB7XG5cdFx0XHRcdFx0aXRlbXMucHVzaCggbW9kZWwuJGNsb25lKCBfZGF0YSApICk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0bW9kZWwgPSBpdGVtcztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1vZGVsLiRkYXRhKCByZXNwb25zZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF9jYWxsYmFjayAmJiBfY2FsbGJhY2soIGVycm9yLCBtb2RlbCApO1xuXG5cdH0sIF9tb2RlbCwgX2RhdGEsIF9tZXRob2QsIF91cmwgKTtcblxufTtcbiIsInZhciB0eXBlID0gcmVxdWlyZSggXCJ0eXBlLWNvbXBvbmVudFwiICksXG4gIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGhhc0tleSggb2JqZWN0LCBrZXlzLCBrZXlUeXBlICkge1xuXG4gIG9iamVjdCA9IHR5cGUoIG9iamVjdCApID09PSBcIm9iamVjdFwiID8gb2JqZWN0IDoge30sIGtleXMgPSB0eXBlKCBrZXlzICkgPT09IFwiYXJyYXlcIiA/IGtleXMgOiBbXTtcbiAga2V5VHlwZSA9IHR5cGUoIGtleVR5cGUgKSA9PT0gXCJzdHJpbmdcIiA/IGtleVR5cGUgOiBcIlwiO1xuXG4gIHZhciBrZXkgPSBrZXlzLmxlbmd0aCA+IDAgPyBrZXlzLnNoaWZ0KCkgOiBcIlwiLFxuICAgIGtleUV4aXN0cyA9IGhhcy5jYWxsKCBvYmplY3QsIGtleSApIHx8IG9iamVjdFsga2V5IF0gIT09IHZvaWQgMCxcbiAgICBrZXlWYWx1ZSA9IGtleUV4aXN0cyA/IG9iamVjdFsga2V5IF0gOiB1bmRlZmluZWQsXG4gICAga2V5VHlwZUlzQ29ycmVjdCA9IHR5cGUoIGtleVZhbHVlICkgPT09IGtleVR5cGU7XG5cbiAgaWYgKCBrZXlzLmxlbmd0aCA+IDAgJiYga2V5RXhpc3RzICkge1xuICAgIHJldHVybiBoYXNLZXkoIG9iamVjdFsga2V5IF0sIGtleXMsIGtleVR5cGUgKTtcbiAgfVxuXG4gIHJldHVybiBrZXlzLmxlbmd0aCA+IDAgfHwga2V5VHlwZSA9PT0gXCJcIiA/IGtleUV4aXN0cyA6IGtleUV4aXN0cyAmJiBrZXlUeXBlSXNDb3JyZWN0O1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCBvYmplY3QsIGtleXMsIGtleVR5cGUgKSB7XG5cbiAga2V5cyA9IHR5cGUoIGtleXMgKSA9PT0gXCJzdHJpbmdcIiA/IGtleXMuc3BsaXQoIFwiLlwiICkgOiBbXTtcblxuICByZXR1cm4gaGFzS2V5KCBvYmplY3QsIGtleXMsIGtleVR5cGUgKTtcblxufTsiLCJ2YXIgdHlwZSA9IHJlcXVpcmUoIFwiLi9pc2VzL3R5cGVcIiApLFxuICBpcyA9IHtcbiAgICBhOiB7fSxcbiAgICBhbjoge30sXG4gICAgbm90OiB7XG4gICAgICBhOiB7fSxcbiAgICAgIGFuOiB7fVxuICAgIH1cbiAgfTtcblxudmFyIGlzZXMgPSB7XG4gIFwiYXJndW1lbnRzXCI6IFsgXCJhcmd1bWVudHNcIiwgdHlwZSggXCJhcmd1bWVudHNcIiApIF0sXG4gIFwiYXJyYXlcIjogWyBcImFycmF5XCIsIHR5cGUoIFwiYXJyYXlcIiApIF0sXG4gIFwiYm9vbGVhblwiOiBbIFwiYm9vbGVhblwiLCB0eXBlKCBcImJvb2xlYW5cIiApIF0sXG4gIFwiZGF0ZVwiOiBbIFwiZGF0ZVwiLCB0eXBlKCBcImRhdGVcIiApIF0sXG4gIFwiZnVuY3Rpb25cIjogWyBcImZ1bmN0aW9uXCIsIFwiZnVuY1wiLCBcImZuXCIsIHR5cGUoIFwiZnVuY3Rpb25cIiApIF0sXG4gIFwibnVsbFwiOiBbIFwibnVsbFwiLCB0eXBlKCBcIm51bGxcIiApIF0sXG4gIFwibnVtYmVyXCI6IFsgXCJudW1iZXJcIiwgXCJpbnRlZ2VyXCIsIFwiaW50XCIsIHR5cGUoIFwibnVtYmVyXCIgKSBdLFxuICBcIm9iamVjdFwiOiBbIFwib2JqZWN0XCIsIHR5cGUoIFwib2JqZWN0XCIgKSBdLFxuICBcInJlZ2V4cFwiOiBbIFwicmVnZXhwXCIsIHR5cGUoIFwicmVnZXhwXCIgKSBdLFxuICBcInN0cmluZ1wiOiBbIFwic3RyaW5nXCIsIHR5cGUoIFwic3RyaW5nXCIgKSBdLFxuICBcInVuZGVmaW5lZFwiOiBbIFwidW5kZWZpbmVkXCIsIHR5cGUoIFwidW5kZWZpbmVkXCIgKSBdLFxuICBcImVtcHR5XCI6IFsgXCJlbXB0eVwiLCByZXF1aXJlKCBcIi4vaXNlcy9lbXB0eVwiICkgXSxcbiAgXCJudWxsb3J1bmRlZmluZWRcIjogWyBcIm51bGxPclVuZGVmaW5lZFwiLCBcIm51bGxvcnVuZGVmaW5lZFwiLCByZXF1aXJlKCBcIi4vaXNlcy9udWxsb3J1bmRlZmluZWRcIiApIF0sXG4gIFwiZ3VpZFwiOiBbIFwiZ3VpZFwiLCByZXF1aXJlKCBcIi4vaXNlcy9ndWlkXCIgKSBdXG59XG5cbk9iamVjdC5rZXlzKCBpc2VzICkuZm9yRWFjaCggZnVuY3Rpb24gKCBrZXkgKSB7XG5cbiAgdmFyIG1ldGhvZHMgPSBpc2VzWyBrZXkgXS5zbGljZSggMCwgaXNlc1sga2V5IF0ubGVuZ3RoIC0gMSApLFxuICAgIGZuID0gaXNlc1sga2V5IF1bIGlzZXNbIGtleSBdLmxlbmd0aCAtIDEgXTtcblxuICBtZXRob2RzLmZvckVhY2goIGZ1bmN0aW9uICggbWV0aG9kS2V5ICkge1xuICAgIGlzWyBtZXRob2RLZXkgXSA9IGlzLmFbIG1ldGhvZEtleSBdID0gaXMuYW5bIG1ldGhvZEtleSBdID0gZm47XG4gICAgaXMubm90WyBtZXRob2RLZXkgXSA9IGlzLm5vdC5hWyBtZXRob2RLZXkgXSA9IGlzLm5vdC5hblsgbWV0aG9kS2V5IF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApID8gZmFsc2UgOiB0cnVlO1xuICAgIH1cbiAgfSApO1xuXG59ICk7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGlzO1xuZXhwb3J0cy50eXBlID0gdHlwZTsiLCJ2YXIgdHlwZSA9IHJlcXVpcmUoXCIuLi90eXBlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG4gIHZhciBlbXB0eSA9IGZhbHNlO1xuXG4gIGlmICggdHlwZSggdmFsdWUgKSA9PT0gXCJudWxsXCIgfHwgdHlwZSggdmFsdWUgKSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcbiAgICBlbXB0eSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoIHR5cGUoIHZhbHVlICkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgZW1wdHkgPSBPYmplY3Qua2V5cyggdmFsdWUgKS5sZW5ndGggPT09IDA7XG4gIH0gZWxzZSBpZiAoIHR5cGUoIHZhbHVlICkgPT09IFwiYm9vbGVhblwiICkge1xuICAgIGVtcHR5ID0gdmFsdWUgPT09IGZhbHNlO1xuICB9IGVsc2UgaWYgKCB0eXBlKCB2YWx1ZSApID09PSBcIm51bWJlclwiICkge1xuICAgIGVtcHR5ID0gdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IC0xO1xuICB9IGVsc2UgaWYgKCB0eXBlKCB2YWx1ZSApID09PSBcImFycmF5XCIgfHwgdHlwZSggdmFsdWUgKSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICBlbXB0eSA9IHZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBlbXB0eTtcblxufTsiLCJ2YXIgZ3VpZCA9IHJlcXVpcmUoIFwic2MtZ3VpZFwiICk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgcmV0dXJuIGd1aWQuaXNWYWxpZCggdmFsdWUgKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXHRyZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gdm9pZCAwO1xufTsiLCJ2YXIgdHlwZSA9IHJlcXVpcmUoIFwiLi4vdHlwZVwiICk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCBfdHlwZSApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICggX3ZhbHVlICkge1xuICAgIHJldHVybiB0eXBlKCBfdmFsdWUgKSA9PT0gX3R5cGU7XG4gIH1cbn0iLCJ2YXIgZ3VpZFJ4ID0gXCJ7P1swLTlBLUZhLWZdezh9LVswLTlBLUZhLWZdezR9LTRbMC05QS1GYS1mXXszfS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXsxMn19P1wiO1xuXG5leHBvcnRzLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgZ3VpZCA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCIucmVwbGFjZSggL1t4eV0vZywgZnVuY3Rpb24gKCBjICkge1xuICAgIHZhciByID0gKCBkICsgTWF0aC5yYW5kb20oKSAqIDE2ICkgJSAxNiB8IDA7XG4gICAgZCA9IE1hdGguZmxvb3IoIGQgLyAxNiApO1xuICAgIHJldHVybiAoIGMgPT09IFwieFwiID8gciA6ICggciAmIDB4NyB8IDB4OCApICkudG9TdHJpbmcoIDE2ICk7XG4gIH0gKTtcbiAgcmV0dXJuIGd1aWQ7XG59O1xuXG5leHBvcnRzLm1hdGNoID0gZnVuY3Rpb24gKCBzdHJpbmcgKSB7XG4gIHZhciByeCA9IG5ldyBSZWdFeHAoIGd1aWRSeCwgXCJnXCIgKSxcbiAgICBtYXRjaGVzID0gKCB0eXBlb2Ygc3RyaW5nID09PSBcInN0cmluZ1wiID8gc3RyaW5nIDogXCJcIiApLm1hdGNoKCByeCApO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSggbWF0Y2hlcyApID8gbWF0Y2hlcyA6IFtdO1xufTtcblxuZXhwb3J0cy5pc1ZhbGlkID0gZnVuY3Rpb24gKCBndWlkICkge1xuICB2YXIgcnggPSBuZXcgUmVnRXhwKCBndWlkUnggKTtcbiAgcmV0dXJuIHJ4LnRlc3QoIGd1aWQgKTtcbn07IiwidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoIHZhbCApIHtcbiAgc3dpdGNoICggdG9TdHJpbmcuY2FsbCggdmFsICkgKSB7XG4gIGNhc2UgJ1tvYmplY3QgRnVuY3Rpb25dJzpcbiAgICByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgcmV0dXJuICdkYXRlJztcbiAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgcmV0dXJuICdhcmd1bWVudHMnO1xuICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cblxuICBpZiAoIHZhbCA9PT0gbnVsbCApIHJldHVybiAnbnVsbCc7XG4gIGlmICggdmFsID09PSB1bmRlZmluZWQgKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICggdmFsID09PSBPYmplY3QoIHZhbCApICkgcmV0dXJuICdvYmplY3QnO1xuXG4gIHJldHVybiB0eXBlb2YgdmFsO1xufTsiLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgncmVkdWNlJyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3QgPSAndW5kZWZpbmVkJyA9PSB0eXBlb2Ygd2luZG93XG4gID8gdGhpc1xuICA6IHdpbmRvdztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgaG9zdCBvYmplY3QsXG4gKiB3ZSBkb24ndCB3YW50IHRvIHNlcmlhbGl6ZSB0aGVzZSA6KVxuICpcbiAqIFRPRE86IGZ1dHVyZSBwcm9vZiwgbW92ZSB0byBjb21wb2VudCBsYW5kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSG9zdChvYmopIHtcbiAgdmFyIHN0ciA9IHt9LnRvU3RyaW5nLmNhbGwob2JqKTtcblxuICBzd2l0Y2ggKHN0cikge1xuICAgIGNhc2UgJ1tvYmplY3QgRmlsZV0nOlxuICAgIGNhc2UgJ1tvYmplY3QgQmxvYl0nOlxuICAgIGNhc2UgJ1tvYmplY3QgRm9ybURhdGFdJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbmZ1bmN0aW9uIGdldFhIUigpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAmJiAoJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChudWxsICE9IG9ialtrZXldKSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhcnRzO1xuICB2YXIgcGFpcjtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcGFydHMgPSBwYWlyLnNwbGl0KCc9Jyk7XG4gICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICdhcHBsaWNhdGlvbi94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbiB9O1xuXG4gLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGxpbmVzLnBvcCgpOyAvLyB0cmFpbGluZyBDUkxGXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHR5cGUoc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyYW1zKHN0cil7XG4gIHJldHVybiByZWR1Y2Uoc3RyLnNwbGl0KC8gKjsgKi8pLCBmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pXG4gICAgICAsIGtleSA9IHBhcnRzLnNoaWZ0KClcbiAgICAgICwgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgdGhpcy50ZXh0ID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICB0aGlzLnNldFN0YXR1c1Byb3BlcnRpZXModGhpcy54aHIuc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLnNldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgPyB0aGlzLnBhcnNlQm9keSh0aGlzLnRleHQpXG4gICAgOiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gIC8vIGNvbnRlbnQtdHlwZVxuICB2YXIgY3QgPSB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICB2YXIgb2JqID0gcGFyYW1zKGN0KTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgdGhpc1trZXldID0gb2JqW2tleV07XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgcmV0dXJuIHBhcnNlXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cyB8fCAxMjIzID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciBwYXRoID0gcmVxLnBhdGg7XG5cbiAgdmFyIG1zZyA9ICdjYW5ub3QgJyArIG1ldGhvZCArICcgJyArIHBhdGggKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIucGF0aCA9IHBhdGg7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTtcbiAgdGhpcy5faGVhZGVyID0ge307XG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICBpZiAoJ0hFQUQnID09IG1ldGhvZCkgcmVzLnRleHQgPSBudWxsO1xuICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbihmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogU2V0IHRpbWVvdXQgdG8gYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24obXMpe1xuICB0aGlzLl90aW1lb3V0ID0gbXM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5hYm9ydGVkKSByZXR1cm47XG4gIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyLmFib3J0KCk7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0SGVhZGVyID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzKXtcbiAgdmFyIHN0ciA9IGJ0b2EodXNlciArICc6JyArIHBhc3MpO1xuICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgc3RyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbipcbiogRXhhbXBsZXM6XG4qXG4qICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4qICAgICAucXVlcnkoJ3NpemU9MTAnKVxuKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuKlxuKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiogQGFwaSBwdWJsaWNcbiovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBxdWVyeXN0cmluZ1xuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG11bHRpcGxlIGRhdGEgXCJ3cml0ZXNcIlxuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuc2VuZCh7IHNlYXJjaDogJ3F1ZXJ5JyB9KVxuICogICAgICAgICAuc2VuZCh7IHJhbmdlOiAnMS4uNScgfSlcbiAqICAgICAgICAgLnNlbmQoeyBvcmRlcjogJ2Rlc2MnIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaikgcmV0dXJuIHRoaXM7XG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIGlmICgyID09IGZuLmxlbmd0aCkgcmV0dXJuIGZuKGVyciwgcmVzKTtcbiAgaWYgKGVycikgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICBmbihyZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dEVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCd0aW1lb3V0IG9mICcgKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbigpe1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSBnZXRYSFIoKTtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIGlmICg0ICE9IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgaWYgKDAgPT0geGhyLnN0YXR1cykge1xuICAgICAgaWYgKHNlbGYuYWJvcnRlZCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgaWYgKHhoci51cGxvYWQpIHtcbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKXtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gdGltZW91dFxuICBpZiAodGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVt0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyldO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuICB4aHIuc2VuZChkYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdGAuXG4gKi9cblxucmVxdWVzdC5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBJc3N1ZSBhIHJlcXVlc3Q6XG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgcmVxdWVzdCgnR0VUJywgJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycsIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB1cmwgb3IgY2FsbGJhY2tcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmRlbCA9IGZ1bmN0aW9uKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZm4uX29mZiA9IG9uO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBpID0gY2FsbGJhY2tzLmluZGV4T2YoZm4uX29mZiB8fCBmbik7XG4gIGlmICh+aSkgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsIlxuLyoqXG4gKiBSZWR1Y2UgYGFycmAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TWl4ZWR9IGluaXRpYWxcbiAqXG4gKiBUT0RPOiBjb21iYXRpYmxlIGVycm9yIGhhbmRsaW5nP1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBmbiwgaW5pdGlhbCl7ICBcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgY3VyciA9IGFyZ3VtZW50cy5sZW5ndGggPT0gM1xuICAgID8gaW5pdGlhbFxuICAgIDogYXJyW2lkeCsrXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgY3VyciA9IGZuLmNhbGwobnVsbCwgY3VyciwgYXJyW2lkeF0sICsraWR4LCBhcnIpO1xuICB9XG4gIFxuICByZXR1cm4gY3Vycjtcbn07Il19
(7)
});
