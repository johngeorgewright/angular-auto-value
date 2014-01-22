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
  grunt.loadNpmTasks('grunt-protractor-runner');

};

