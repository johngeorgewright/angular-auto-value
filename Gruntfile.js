var serveStatic = require('serve-static');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 8000,
        hostname: '0.0.0.0',
        base: '.',
        keepalive: false,
        middleware: function (connect, options) {
          var middleware = [
            function (req, res, next) {
              if (req.method === 'GET') {
                res.setHeader('Cache-control', 'public, max-age=3600');
              }
              next();
            },
          ];
          options.base.forEach(function (base) {
            middleware.push(serveStatic(base));
          });
          return middleware;
        }
      },
      test: {},
      dev: {
        options: {
          keepalive: true
        }
      }
    },
    http: {
      closure: {
        options: {
          url: 'http://closure-compiler.appspot.com/compile',
          method: 'POST',
          form: {
            output_info: 'compiled_code',
            output_format: 'text',
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level: 'default'
          },
          sourceField: 'form.js_code'
        },
        files: {
          'angular-auto-value.min.js': 'angular-auto-value.js'
        }
      }
    },
    protractor: {
      options: {
        configFile: "test/conf.js",
        keepAlive: false,
        noColor: false
      },
      'stand-alone': {},
      attach: {
        options: {
          args: {
            seleniumAddress: 'http://127.0.0.1:4444/wd/hub'
          }
        }
      }
    },
    watch: {
      protractor: {
        files: ['angular-auto-value.js', 'test/*Spec.js'],
        tasks: ['protractor:attach']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['connect:test', 'protractor:stand-alone']);
  grunt.registerTask('dev', ['connect:test', 'watch']);
  grunt.registerTask('default', ['test', 'http:closure']);

};
