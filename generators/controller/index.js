'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _s = require('underscore.inflections');

var KonaCtrlGenerator = yeoman.generators.NamedBase.extend({
  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this._.mixin(_s);
    this.option('scaffold');
    this._parseNames();
  },

  _parseNames: function(name) {

    this.name = this._.trim(this.name);

    if (this.name.toLowerCase() !== 'application') {
      this.name = this._.pluralize(this.name);
    }

    this.snaked = this._.underscore(this.name);
    this.slugged = this._.slugify(this.snaked);
    this.classified = this._.camelize(this.snaked);
    this.camelized = this._.camelize(this.snaked, false);
    this.singularCamel = this._.singularize(this.camelized);

    this.actions = this.arguments.slice(1).map(function(rawActionName) {
      return this._.camelize(this._.underscore(rawActionName), false);
    }.bind(this));
  },

  writing: {
    controller: function () {
      var root = this.destinationRoot(),
          fileName = this.slugged + '-controller.js',
          dest = path.join(root, 'app', 'controllers', fileName);

      if (this.snaked === 'application') {
        this.require = false;
        this.baseCtrlName = 'kona.Controller.Base';
      } else {
        this.require = true;
        this.baseCtrlName = 'ApplicationController';
      }

      this.template('controller.js', dest);

      this.log(this.classified + 'Controller generated.');
    }
  }
});

module.exports = KonaCtrlGenerator;
