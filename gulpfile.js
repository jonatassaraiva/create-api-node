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

gulp.task('unitTests', function () {
	gulp.src('src/tests/units/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }));
});

gulp.task('integrationTests', function () {
	gulpEnv({ vars: { ENV: 'IntegrationTests' } });
	gulp.src('src/tests/integrations/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }))
		.on('end', function(){
			process.exit();
		});
});

	