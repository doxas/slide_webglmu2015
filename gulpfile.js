// load plugin
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),
	browserSync = require('browser-sync'),
	runSequence = require('run-sequence');

// path string
var paths = {
	'htmlDir': 'html/**',
	'jsDir': 'js/*.js',
	'cssDir': 'style/*.css',
	'imageDir': 'image/**',
	'destDir': 'build/',
};

// browser sync
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: paths.destDir
		}
	});
});

// js
gulp.task('jslint', function() {
	return gulp.src(paths.jsDir)
		.pipe($.jshint())
		.pipe($.jshint.reporter());
});

gulp.task('buildjs', function() {
	return gulp.src(paths.jsDir)
		.pipe($.uglify())
		.pipe($.concat('script.js'))
		.pipe(gulp.dest(paths.destDir));
});

gulp.task('concatjs', function() {
	return gulp.src(paths.jsDir)
		.pipe($.concat('script.js'))
		.pipe(gulp.dest(paths.destDir));
});

// other task
gulp.task('copy', function() {
	gulp.src(paths.htmlDir).pipe(gulp.dest(paths.destDir));
	gulp.src(paths.cssDir).pipe(gulp.dest(paths.destDir));
	return browserSync.reload();
});

gulp.task('watch', function() {
	gulp.watch([paths.htmlDir], ['copy']);
	gulp.watch([paths.cssDir], ['copy']);
	gulp.watch([paths.jsDir]), ['concatjs'];
});

gulp.task('build', function() {
	runSequence('jslint', 'buildjs', 'watch', 'browserSync');
});

gulp.task('test', function() {
	runSequence('copy', 'jslint', 'concatjs', 'watch', 'browserSync');
});

gulp.task('default', ['test']);
