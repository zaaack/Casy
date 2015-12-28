var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass')
var streamqueue  = require('streamqueue');


var paths = {
    scripts: ['assets/src/**/*.js'],
    css: ['assets/src/**/*.scss']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['assets/build'], cb);
});

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    return streamqueue({objectMode: true},
        gulp.src('assets/src/js/index.js'),
        gulp.src('assets/src/js/jquery.fitvids.js')
    )
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('assets/build'));
});

gulp.task('minify-css', function() {
    return gulp.src('assets/src/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('assets/build'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.css, ['minify-css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'minify-css']);
