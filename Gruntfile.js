module.exports = function(grunt) {
  // grunt.log.header = function() {};
  // grunt.fail.report = function() {};
  // grunt.fail.warn = function() {};
  // grunt.log.muted = true;

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        maxcomplexity: 45,
        expr: true,
        loopfunc: true,
        quotmark: 'single',
        node: true,
        ignores: ['lib/tools/voltage_encryption.js']
      },
      files: [
        '*.js',
        'utils/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
        'config/*.js',
        'config/data/*.js'
      ]
    },

    jscs: {
      options: {
        force: true,
        disallowTrailingWhitespace: true,
        requireSpaceAfterLineComment: true,
        disallowFunctionDeclarations: true,
        disallowMultipleVarDecl: true,
        disallowMixedSpacesAndTabs: true,
        disallowNewlineBeforeBlockStatements: true,
        disallowKeywordsOnNewLine: ['else'],
        requireSpaceAfterComma: {allExcept: ['trailing']},
        validateIndentation: 2,
        excludeFiles: ['lib/tools/voltage_encryption.js']
      },
      files: { src: [
        '*.js',
        'utils/**/*.js',
        'test/**/*.js',
        'lib/**/*.js',
        'config/*.js',
        'config/data/*.js'
      ]}
    },

    env : {
      options: {
        // Shared Options Hash
      },
      staging: {
        NODE_ENV: 'stage2'
      },
      staging_proxy: {
        NODE_ENV: 'stage2',
        NODE_CONFIG : '{"proxy":"http://127.0.0.1:8888"}'
      },
      staging_sdc_proxy : {
        NODE_ENV: 'stage2',
        NODE_CONFIG: '{"proxy":"http://ndc-drurl.walmart.com:8080"}'
      }
    }

  });

  // Load plugin(s)
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Add task(s)
  grunt.registerTask('default', ['jscs', 'jshint']);
};

