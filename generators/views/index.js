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
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    views: function() {
      var _this = this;
      this.singularName = this._.singularize(this.name);
      this.slug = this._.slugify(this.name);
      ['edit', 'index', 'add', 'show'].forEach(function(tpl) {
        _this.template(tpl + '.html', path.join('app', 'views', _this.slug, tpl + '.html'));
      });
    }
  },

  end: function () {}
});

module.exports = KonaViewGenerator;
