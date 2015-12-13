var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        stdout: false
    }).on('readable', function () {
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', ['develop']);


