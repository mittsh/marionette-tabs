var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      core_banner:
        '// Marionette Tabs\n' +
        '// ----------------------------------\n' +
        '// v<%= pkg.version %>\n' +
        '//\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Stu Kabakoff\n' +
        '// Distributed under MIT license\n' +
        '//\n' +
        '// https://github.com/compstak/marionette-tabs\n' +
        '\n',
    },

    clean: {
      lib: 'lib'
    },

    preprocess: {
      core: {
        src: 'src/index.js',
        dest: 'tmp/index.js'
      }
    },

    concat: {
      options: {
        banner: '<%= meta.core_banner %>'
      },
      core: {
        src: '<%= preprocess.core.dest %>',
        dest: 'lib/backbone.marionette-tabs.js'
      }
    },

    uglify : {
      core: {
        src : '<%= concat.core.dest %>',
        dest : 'lib/backbone.marionette-tabs.min.js',
        options : {
          banner: '<%= meta.core_banner %>',
          sourceMap : 'lib/backbone.marionette-tabs.map',
          sourceMappingURL : 'backbone.marionette-tabs.map',
          sourceMapPrefix : 1
        }
      }
    }
  });

  grunt.registerTask('default', 'An alias task for build.', ['build']);

  grunt.registerTask('build', 'Build all three versions of the library.', ['clean:lib', 'preprocess', 'concat', 'uglify']);
};
