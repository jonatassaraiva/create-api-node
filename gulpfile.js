var gulp = require('gulp'),
	gulpNodemon = require('gulp-nodemon'),
	gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
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
	gulp.src('src/tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }));
});
