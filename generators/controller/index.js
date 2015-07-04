'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var NameParser = require('../../mixins/name-parser');

var KonaCtrlGenerator = yeoman.generators.NamedBase.extend({
  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this.option('scaffold');
    this.parseNameAndActions();
  },

  parseNameAndActions: function() {

    this.parseName(this.name);

    this.actions = this.arguments.slice(1).map(function(rawActionName) {
      return this._.camelize(this._.underscore(rawActionName), false);
    }.bind(this));
  },

  writing: {
    controller: function () {
      var rootDir = this.destinationRoot(),
          fileName = this.slugged + '-controller.js',
          dest = path.join(rootDir, 'app', 'controllers', fileName);

      if (this.snaked === 'application') {
        this.baseCtrlPath = 'kona/lib/controller/request';
        this.baseCtrlName = 'Controller';
      } else {
        this.baseCtrlPath = './application-controller';
        this.baseCtrlName = 'ApplicationController';
      }

      this.template('controller.js', dest);

      this.log(this.classified + 'Controller generated.');
    }
  }
});

NameParser(KonaCtrlGenerator);

module.exports = KonaCtrlGenerator;
