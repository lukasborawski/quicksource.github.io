// Extentions
var del             = require('del');

var gulp            = require('gulp');
var gulp_dest       = require('gulp-dest');
var gulp_jquery     = require('gulp-jquery');
var gulp_uglify     = require('gulp-uglify');
var gulp_jshint     = require('gulp-jshint');
var gulp_sequence   = require('run-sequence');

// JS Paths
// ----------------------------------------------
var js_src = 'js/';
var js_src_dev = 'public/js/'

// Move Task
// ----------------------------------------------
// set directories to move
var filesToMove = [
    'node_modules/requirejs/require.js',
    'node_modules/html5shiv/src/html5shiv.js'
];
// files output
var filesMoveOutput = 'js/libs/';
// move task
gulp.task('move', function() {
    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest(filesMoveOutput)).on('error', errorHandler);
});

// Delete Tast
// ----------------------------------------------
gulp.task('clean', function() {
    del([filesMoveOutput + '/node_modules/*']);
});

// JS Tasks
// ----------------------------------------------
gulp.task('lint', function() {
    return gulp.src(js_src + '**/*.js')
        .pipe(gulp_jshint())
        .pipe(gulp_jshint.reporter('default'));
});
gulp.task('uglify', function() {
    gulp.src([
        js_src_dev + '**/*.js'
    ])
        .pipe(gulp_uglify())
        .pipe(gulp.dest(js_src_dev))
});

// jQuery Builder Task
// ----------------------------------------------
gulp.task('jquery', function () {
    return gulp_jquery.src({
        release: 2,
        flags: ['-ajax']
    })
        .pipe(gulp.dest(filesMoveOutput));
});

// Watch Tasks
// ----------------------------------------------
gulp.task('watch', function() {
    gulp.watch(js_src + '**/*', ['lint']);
});

// Gulp Build Tasks
// ----------------------------------------------
gulp.task('dev', function(callback) {
    gulp_sequence('lint', 'watch', callback);
});
// do not fire this event on your development enviroment
gulp.task('default', function(callback) {
    gulp_sequence('clean', 'move', callback);
});
gulp.task('prod', function(callback) {
    gulp_sequence('clean', 'move', 'uglify', callback);
});

// Handle the error
function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}