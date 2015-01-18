'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var KonaGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appName', {
      type: String,
      required: false
    });
    if (!this.appName) {
      this.appName = path.basename(process.cwd());
      this.defaultedAppName = true;
    }
    this.appName = this._.camelize(this._.slugify(this._.humanize(this.appName)));
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async(),
        _this = this;

    this.log('Welcome to the Kona generator!');

    if (this.defaultedAppName) {
      this.prompt({
        type: 'confirm',
        name: 'confirmAppName',
        message: 'Create a Kona application named ' + this.appName + '?',
        default: true
      }, function (answers) {
        if (answers.confirmAppName) {
          done();
        } else {
          _this.prompt({
            type: 'input',
            name: 'appName',
            message: 'What name would you like to use?',
            default: 'konaApp'
          }, function(answers) {
            _this.appName = _this._.camelize(
              _this._.slugify(
                _this._.humanize(answers.appName)
              )
            );
            done();
          });
        }
      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    app: function () {
      this.destinationRoot(this.appName);

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('bowerrc', '.bowerrc');
      this.copy('app.js', 'app.js');
      this.directory('app', 'app');
      this.directory('public', 'public');
      this.directory('log', 'log');
      this.directory('config', 'config');

    },
    controllers: function(done) {
      this.composeWith('kona:controller', {
        arguments: ['Application']
      });
    }
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.installDependencies({silent: true});
    }
  }
});

module.exports = KonaGenerator;
