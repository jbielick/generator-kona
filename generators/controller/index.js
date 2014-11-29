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
    this.name = this._.slugify(this._.humanize(this.name)).toLowerCase();
    if (this.name != 'application') {
      this.name = this._.pluralize(this.name);
    }
    this.singularName = this._.singularize(this.name);
    this.actions = this.arguments.slice(1);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    controller: function () {
      var fileName = this.name + '-controller.js',
          dest = path.join('.', 'app', 'controllers', fileName);

      if (this.name === 'application') {
        this.require = false;
        this.baseCtrlName = 'Kona.Controller.Base';
      } else {
        this.require = true;
        this.baseCtrlName = 'ApplicationController';
      }

      this.template('controller.js', dest);
    }
  },

  end: function () {
    this.log(this._.titleize(this.name) + 'Controller generated.');
  }
});

module.exports = KonaCtrlGenerator;
