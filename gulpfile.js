'use strict';
// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp            = require('gulp'),
    connect         = require('gulp-connect'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    concat          = require('gulp-concat'),
    streamify       = require('gulp-streamify'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    less            = require('gulp-less'),
    prefix          = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    notify          = require('gulp-notify'),
    browserify      = require('browserify'),
    watchify        = require('watchify'),
    del             = require('del'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    runSequence     = require('run-sequence');

var karma = require('gulp-karma');


// =======================================================================
// File Paths
// =======================================================================
var filePath = {
    build: {
        dest: './dist',
        dev: './dev'
    },
    lint: {
        src: ['./app/*.js', './app/**/*.js', './server/*.js', './server/**/*.js']
    },
    browserify: {
        src: './app/app.js',
        watch:
        [
            '!./app/assets/libs/*.js',
            '!./app/assets/libs/**/*.js',
            './app/*.js','./app/**/*.js',
            '/app/**/*.html'
        ]
    },
    styles: {
        src: './app/app.less',
        watch: ['./app/app.less','./app/**/*.less']
    },
    images: {
        src: './app/assets/images/**/*',
        watch: ['./app/assets/images', './app/assets/images/**/*'],
        dest: './dist/images/'
    },
    svgs: {
        src: './app/assets/svgs/**/*',
        watch: ['./app/assets/svgs/*.svg', './app/assets/svgs/**/*.svg'],
        dest: './dist/svgs/'
    },
    vendorJS: {
        // These files will be bundled into a single vendor.js file that's called at the bottom of index.html
        src:
        [
            './libs/jquery/dist/jquery.js', // v2.1.1
            './libs/bootstrap/dist/js/bootstrap.js', // v3.1.1
            './libs/snap.svg/dist/snap.svg.js'
        ]
    },
    vendorCSS: {
        src:
        [
            './libs/bootstrap/dist/css/bootstrap.css', // v3.1.1
            './libs/font-awesome/css/font-awesome.css' // v4.1.0
        ]
    },
    copyIndex: {
        src: './app/index.html',
        watch: './app/index.html'
    },
    copyFavicon: {
        src: './app/favicon.png'
    }
};


// =======================================================================
// Error Handling
// =======================================================================
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


// =======================================================================
// Server Task
// =======================================================================
var express = require('express'),
    server  = express();


// Server settings
server.use(express.static(filePath.build.dest));

server.all('/*', function(req, res) {
    res.sendfile('/', { root: filePath.build.dest });
});

var api = require('./server/lib/api');
api.initialize(server);
//var server = require('./server/index.js');

// uncomment the "middleware" section when you are ready to connect to an API
gulp.task('server', function() {
    //server.start();
    connect.server({
        root: filePath.build.dest,
        fallback: filePath.build.dest + '/index.html',
        port: 5000,
        livereload: true
        // ,
        // middleware: function(connect, o) {
        //     return [ (function() {
        //         var url = require('url');
        //         var proxy = require('proxy-middleware');
        //         var options = url.parse('http://localhost:3000/'); // path to your dev API
        //         options.route = '/api';
        //         return proxy(options);
        //     })() ];
        // }
    });
});


// =======================================================================
// Clean out dist folder contents on build
// =======================================================================
gulp.task('clean-dev', function () {
    del(['./dev/*', './dist/*.js', './dist/*.css', '!./dist/vendor.js', '!./dist/vendor.css', './dist/*.html', './dist/*.png', './dist/*.ico']);
});

gulp.task('clean-full', function () {
    del(['./dist/*', './dev/*']);
});


// =======================================================================
// JSHint
// =======================================================================
gulp.task('lint', function() {
    return gulp.src(filePath.lint.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// =======================================================================
// Browserify Bundle
// =======================================================================
gulp.task('bundle-dev', function() {

    var entryFile = filePath.browserify.src,
        bundler = watchify(entryFile);

    function rebundle () {
        return bundler.bundle({ debug: true })
            .pipe(source('bundle.js'))
            .on('error', handleError)
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(filePath.build.dest))
            .pipe(notify({ message: 'Browserify task complete' }))
            .pipe(connect.reload());
    }

    bundler.on('update', rebundle);

    return rebundle();
});

gulp.task('bundle-prod', function() {

    var entryFile = filePath.browserify.src,
        bundler = watchify(entryFile);

    function rebundle () {
        return bundler.bundle({ debug: true })
            .pipe(source('bundle.js'))
            .on('error', handleError)
            .pipe(buffer())
            .pipe(streamify(uglify({mangle: false})))
            .pipe(gulp.dest(filePath.build.dest))
            .pipe(notify({ message: 'Browserify task complete' }))
            .pipe(connect.reload());
    }

    bundler.on('update', rebundle);

    return rebundle();
});


// =======================================================================
// Styles Task
// =======================================================================
gulp.task('styles-dev', function () {
    return gulp.src(filePath.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handleError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(filePath.build.dest))
        .on('error', handleError)
        .pipe(notify({ message: 'Styles task complete' }))
        .pipe(connect.reload());
});

gulp.task('styles-prod', function () {
    return gulp.src(filePath.styles.src)
        .pipe(less())
        .on('error', handleError)
        .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7', {map: true}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(filePath.build.dest))
        .on('error', handleError)
        .pipe(notify({ message: 'Styles task complete' }));
});


// =======================================================================
// Images Task
// =======================================================================
gulp.task('images', function() {
    return gulp.src(filePath.images.src)
        .on('error', handleError)
        .pipe(gulp.dest(filePath.images.dest))
        .pipe(notify({ message: 'Images copied' }))
        .pipe(connect.reload());
});


// =======================================================================
// Svgs Task
// =======================================================================
gulp.task('svgs', function() {
    return gulp.src(filePath.svgs.src)
        .on('error', handleError)
        .pipe(gulp.dest(filePath.svgs.dest))
        .pipe(notify({ message: 'Svgs copied' }))
        .pipe(connect.reload());
});

// =======================================================================
// Vendor JS Task
// =======================================================================
gulp.task('vendorJS', function () {
    return gulp.src(filePath.vendorJS.src)
        .pipe(concat('vendor.js'))
        .on('error', handleError)
        .pipe(uglify())
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'VendorJS task complete' }))
});


// =======================================================================
// Vendor CSS Task
// =======================================================================
gulp.task('vendorCSS', function () {
    return gulp.src(filePath.vendorCSS.src)
        .pipe(concat('vendor.css'))
        .on('error', handleError)
        .pipe(minifyCSS())
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'VendorCSS task complete' }))
        .pipe(connect.reload());
});


// =======================================================================
// Copy index.html
// =======================================================================
gulp.task('copyIndex', function () {
    return gulp.src(filePath.copyIndex.src)
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'index.html successfully copied' }))
        .pipe(connect.reload());
});


// =======================================================================
// Copy Favicon
// =======================================================================
gulp.task('copyFavicon', function () {
    return gulp.src(filePath.copyFavicon.src)
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'favicon successfully copied' }));
});


// =======================================================================
// Watch for changes
// =======================================================================
gulp.task('watch', function () {
    gulp.watch(filePath.browserify.watch, ['bundle-dev']);
    gulp.watch(filePath.styles.watch, ['styles-dev']);
    gulp.watch(filePath.images.watch, ['images']);
    gulp.watch(filePath.vendorJS.src, ['vendorJS']);
    gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
    gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
    console.log('Watching...');
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function(callback) {
    runSequence(
        ['clean-dev', 'lint'],
        // images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
        ['bundle-dev', 'styles-dev', 'copyIndex', 'copyFavicon'],
        ['server', 'watch'],
        callback
    );
});

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function(callback) {
    runSequence(
        ['clean-full', 'lint'],
        ['bundle-prod', 'styles-prod', 'images', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
        ['server'],
        callback
    );
});

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function(callback) {
    runSequence(
        ['clean-full', 'lint'],
        ['bundle-dev', 'styles-dev', 'images', 'svgs', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
        ['server', 'watch'],
        callback
    );
});


gulp.task('default',['build-dev']);
gulp.task('prod',['build-prod']);
gulp.task('client:test',['clean-dev', 'copy-dev', 'karma-test']);

// =======================================================================
// Gulp Test
// =========

var testFiles = [
  '/app/tests/*.js'
];

gulp.task('karma-test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', handleError)
    .pipe(notify({ message: 'Karma Tests task complete' }));
});


gulp.task('copy-dev', function() {
  // Be sure to return the stream
  return gulp.src(['./app/**/*', '!app/tests'])
        .pipe(gulp.dest('./dev/'))
        .on('error', handleError);
});


