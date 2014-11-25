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
    this.name = this._.capitalize(this._.slugify(this._.humanize(this.name)));
    this.name = this._.pluralize(this.name);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    controller: function () {
      var name = this.name.toLowerCase() + '-controller.js',
          dest = path.join('.', 'app', 'controllers', name);

      if (this.name === 'Application') {
        this.require = false;
        if (this.api) {
          this.baseCtrlName = 'Kona.Controller.Api';
        } else {
          this.baseCtrlName = 'Kona.Controller.Base';
        }
      } else {
        this.require = true;
        this.baseCtrlName = 'ApplicationController';
      }

      this.template('controller.js', dest);
    }
  },

  end: function () {
    this.log(this._.capitalize(this.name) + 'Controller generated.');
  }
});

module.exports = KonaCtrlGenerator;
