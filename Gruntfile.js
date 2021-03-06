module.exports = function(grunt) {
   'use strict';

   require('time-grunt')(grunt);
   require('jit-grunt')(grunt, {
      scsslint: 'grunt-scss-lint'
   });

   var config = {
      src: 'src',
      dist: 'dist'
   };

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      config: config,

      uglify: {
         options: {
            // The banner is inserted at the top of the output
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
         },
         dist: {
            files: {
               '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
         }
      },

      sass: {
         dist: {
            files: {
               'questions/css/style.css': 'questions/css/style.scss'
            }
         }
      },

      scsslint: {
         allFiles: [
           'questions/css/**/*.scss'
         ],
         options: {
            config: './config/.scss-lint.yml',
            colorizeOutput: true
         }
      },

      jscs: {
         options: {
            config: './config/.jscsrc',
            fix: true
         },
         src: [
             '<%= config.src %>/**/*.js',
             'questions/js/**/*.js',
             'Gruntfile.js',
             'server.js'
         ]
      },

      jshint: {
         options: {
            jshintrc: './config/.jshintrc',
            reporter: require('jshint-stylish')
         },
         src: [
             '<%= config.src %>/**/*.js',
            'questions/js/**/*.js',
             'Gruntfile.js',
           'server.js'
         ]
      },

      watch: {
         js: {
            files: [
'<%= config.src %>/**/*.js',
 'questions/js/**/*.js',
 'Gruntfile.js',
 'server.js'
],
            tasks: ['jshint', 'jscs']
         },
         css: {
            files: ['questions/css/**/*.scss'],
            tasks: ['scsslint', 'sass']
         }
      },

      concurrent: {
         lint: ['jshint', 'jscs', 'scsslint'],
         combine: ['sass']
      }
   });

   grunt.registerTask('default', ['concurrent']);
   grunt.registerTask('dev', ['concurrent', 'watch']);
};