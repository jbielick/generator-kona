'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.inflections');

var KonaViewGenerator = yeoman.generators.NamedBase.extend({
  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this._.mixin(_s);
    this.name = this.name.toLowerCase();
    this.name = this._.pluralize(this.name);
    this.singularName = this._.singularize(this.name);
    this.slug = this._.slugify(this.name);
    this.additional = this.arguments.slice(1);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    views: function() {
      var dest = path.join('app', 'views', this.slug);

      ['edit', 'index', 'add', 'show'].forEach(function(tpl) {
        this.template(tpl + '.ect', path.join(dest, tpl + '.ect'));
      }.bind(this));

      this.additional.forEach(function(tpl) {
        this.template('generic.ect', path.join(dest, tpl + '.ect'));
      }.bind(this));
    }
  },

  end: function () {}
});

module.exports = KonaViewGenerator;
