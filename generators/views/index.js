'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var NameParser = require('../../mixins/name-parser');

var KonaViewGenerator = yeoman.generators.NamedBase.extend({
  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this.parseName(this.name);
    this.additional = this.arguments.slice(1);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    views: function() {
      var dest = path.join('app', 'views', this.slugged);

      ['edit', 'index', 'add', 'show'].forEach(function(tpl) {
        this.template(tpl + '.html', path.join(dest, tpl + '.html'));
      }.bind(this));

      this.additional.forEach(function(tpl) {
        this.template('generic.html', path.join(dest, tpl + '.html'));
      }.bind(this));
    }
  },

  end: function () {}
});

NameParser(KonaViewGenerator);

module.exports = KonaViewGenerator;
