var gulp = require('gulp'),
	compress = require('gulp-uglify'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	cluster = require('cluster'),
	rename = require('gulp-rename'),
	shell = require('gulp-shell'),
	path = require('path');

var worker, livereloadServer;

var livereload = function (_file) {
	return function (_path) {
		if (livereloadServer) livereloadServer.changed(_file);
	}
}

gulp.task('images', function () {
	gulp.src(['./app/client/images/**/*.*'])
		.pipe(gulp.dest('./public/images/'));
});

gulp.task('styles', function () {
	return gulp.src('./app/client/styles/index.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(rename('app.css'))
		.pipe(gulp.dest('./public/styles'))
		.on('end', livereload('.css'));
});

gulp.task('scriptsApp', function () {
	return gulp.src(['./app/client/scripts/index.js'])
		.pipe(browserify({
			standalone: 'app',
			debug: true
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./public/scripts'))
		.on('end', livereload('.js'));
});

gulp.task('scriptsLib', function () {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-route/angular-route.js',
		'./bower_components/async/lib/async.js',
		'./bower_components/moment/moment.js',
		'./bower_components/underscore/underscore.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('markup', function () {
	gulp.src(['./app/client/markup/**/*.*'])
		.pipe(gulp.dest('./public/'))
		.on('end', livereload('.html'));
});

gulp.task('minifyAppScripts', ['scriptsApp'], function () {
	return gulp.src(['./public/scripts/app.js'])
		.pipe(compress())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('minifyLibsScripts', ['scriptsLib'], function () {
	return gulp.src('./public/scripts/libs.js')
		.pipe(compress())
		.pipe(rename('libs.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('test', ['build'], shell.task([
	'npm test'
]));

gulp.task('server', function () {
	cluster.setupMaster({
		exec: "./index.js"
	});

	if (worker) {
		worker.kill();
	}
	worker = cluster.fork();
});

gulp.task('watch', function () {

	livereloadServer = require('gulp-livereload')();

	gulp.watch(['./app/client/styles/**/*.less'], ['styles', 'images']);
	gulp.watch(['./app/client/scripts/**/*'], ['scriptsApp']);
	gulp.watch(['./app/client/markup/**/*.html'], ['markup', 'images']);
	gulp.watch(['./test/**/*'], ['build']);
	gulp.watch(['./app/server/**/*'], ['server']);
	gulp.watch(['./gulpfile.js'], ['default']);
});

gulp.task('default', ['build', 'minify', 'test']);
gulp.task('scripts', ['scriptsApp', 'scriptsLib']);
gulp.task('build', ['styles', 'scripts', 'markup', 'images']);
gulp.task('run', ['build', 'server', 'watch']);
gulp.task('minify', ['minifyAppScripts', 'minifyLibsScripts']);