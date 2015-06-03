// Karma configuration
// Generated on Wed Apr 08 2015 16:17:13 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    frameworks: ['mocha', 'sinon-chai', 'chai'],


    // list of files / patterns to load in the browser
    files: [
            'dist/vendor.js',
            'dist/bundle.js',
            'app/tests/*.spec.js',
            'dist/**/*.html'
    ],

    // list of files to exclude
    exclude: [
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],
    preprocessors: {
        // source files, that you wanna generate coverage for
        './app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      subdir: 'report'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
   // browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
