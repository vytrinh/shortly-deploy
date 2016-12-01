module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist.min.js': ['public/dist.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/dist.min.js'
      ]
    },

    cssmin: {
      my_target: {
        files: {
          'public/lib/style.min.css': ['public/lib/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      add: {
        command: 'git add .'
      }, 
      commit: {
        command: 'git commit -m "Push to production"'
      },
      push: {
        command: 'git push live master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);


  grunt.registerTask('build', [
    'concat', 'eslint', 'uglify', 'test'
  ]);


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here (grunt deploy --prod)

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });


  grunt.registerTask('deploy', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell:add', 'shell:commit', 'shell:push']);
    } else {
      grunt.task.run(['build', 'nodemon']);
    }
  });

};
