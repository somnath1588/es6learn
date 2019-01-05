var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    babel = require('gulp-babel'),
    ts = require('gulp-typescript');
    plumber = require('gulp-plumber'),//it is streaming process and  handle the error in piping process grace fully. 
    
    es6Path = 'es6/src/**/*.js',
    es6tsPath = 'es6/src/**/*.ts',
    compilePath = 'es6/compiled';

    gulp.task('traceur', function () {
        gulp.src([es6Path])
            .pipe(plumber()) 
            .pipe(traceur({ blockBinding: true }))
            .pipe(gulp.dest(compilePath + '/traceur'));
    });

    gulp.task('babel', function () {
        gulp.src([es6Path])
            .pipe(plumber())
            .pipe(babel({presets:['es2015']}))
            .pipe(gulp.dest(compilePath + '/babel'));
    });

    gulp.task('tstask', function () {
        
        return gulp.src([es6tsPath])
            .pipe(ts({
                noImplicitAny: true,
                outDir: 'output.js'
            }))
            .pipe(gulp.dest(compilePath+ '/built'));
    });

    gulp.task('watch', function() {gulp.watch([es6Path], ['traceur','babel']);});
   // gulp.task('watch', function() {gulp.watch([], []);});
    gulp.task('default', ['traceur','babel','tstask','watch']);

