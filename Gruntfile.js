module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 8000,
        hostname: '0.0.0.0',
        base: '.',
        keepalive: true
      },
      test: {
        options: {
          middleware: function (connect, options) {
            return [
              function (req, res, next) {
                if (req.method === 'GET') {
                  res.setHeader('Cache-control', 'public, max-age=3600');
                }
                next();
              },
              connect.static(options.base)
            ];
          }
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
        keepAlive: true,
        noColor: false
      },
      e2e: {
        options: {
          configFile: "test/conf.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-protractor-runner');

};

