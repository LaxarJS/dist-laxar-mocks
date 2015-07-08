/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/*jshint node: true*/
module.exports = function (grunt) {
   'use strict';

   var path = require( 'path' );

   var pkg = grunt.file.readJSON( 'package.json' );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var banner = '/** Copyright 2015 aixigo AG, Released under the MIT license: http://laxarjs.org/license */';

   // mark dependencies that will be satisfied by other bundles
   var DEFER = 'empty:';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var base = {
      baseUrl: 'bower_components',
      name: pkg.name,
      packages: [ {
         name: pkg.name,
         location: pkg.name,
         main: pkg.name
      } ],
      exclude: [ 'text', 'json' ],
      include: [
      ],
      paths: {
         text: 'requirejs-plugins/lib/text',
         json: 'requirejs-plugins/src/json',

         // provided with laxar:
         angular: DEFER,
         'angular-mocks': DEFER,
         laxar: DEFER,

         jasmine: DEFER,
         'promise-polyfill': DEFER,
      },
      out: 'dist/' + pkg.name,
      optimize: 'none',
      generateSourceMaps: false
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.initConfig( {
      requirejs: {
         options: base,

         // Just LaxarJS Testing itself, no dependencies
         // Allows (and requires) you to configure all dependencies yourself.
         'default': {
            options: {
               out: base.out + '.js'
            }
         }
      },

      // For the non-testing bundles, create minified versions as well:
      uglify: {
         options: {
            sourceMap: true,
            banner: banner
         },

         'default': {
            files: {
               'dist/laxar-testing.min.js': [ 'dist/laxar-testing.js' ]
            }
         }
      },

      copy: {
         docs: {
            expand: true,
            mode: true,
            timestamp: true,
            cwd: path.join( 'bower_components', pkg.name ),
            src: 'docs/**',
            dest: 'dist/'
         }
      }
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.loadNpmTasks( 'grunt-contrib-copy' );
   grunt.loadNpmTasks( 'grunt-contrib-uglify' );
   grunt.loadNpmTasks( 'grunt-laxar' );

   grunt.registerTask( 'dist', [ 'requirejs', 'uglify', 'copy' ] );

};
