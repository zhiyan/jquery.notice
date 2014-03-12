'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('jquery.notice.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
          banner: '<%= banner %>',
          stripBanners: true
      },
      js:{
          src: ['src/<%= pkg.name %>.js'],
          dest: 'dist/<%= pkg.name %>.js'
      },
      css:{
          src: ['src/<%= pkg.name %>.css'],
          dest: 'dist/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js:{
          src: '<%= concat.js.dest %>',
          dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      src: {
        files: ['src/<%= pkg.name %>.js','src/<%= pkg.name %>.css'],
        tasks: ['concat','uglify']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};
