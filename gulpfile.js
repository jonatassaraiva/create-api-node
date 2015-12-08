var gulp = require('gulp'),
	gulpNodemon = require('gulp-nodemon'),
	gulpMocha = require('gulp-mocha'),
	gulpEnv = require('gulp-env'),
	supertest = require('supertest');

gulp.task('run-nodemon', function () {
	gulpNodemon({
		script: 'src/app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['.node_modules/**']
	}).on('restart', function () {
		console.log('Restarting');
	});
});

gulp.task('run-tests', function () {
	gulpEnv({ vars: { ENV: 'IntegrationTests' } });
	gulp.src('src/tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }));
});
