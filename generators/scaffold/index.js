'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.inflections');
var fs = require('fs');

var KonaScaffoldGenerator = yeoman.generators.NamedBase.extend({
  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this.name = this._.capitalize(this._.slugify(this._.humanize(this.name)));
    this._.mixin(_s);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  writing: {
    controller: function() {
      this.composeWith('kona:controller', {
        args: this.arguments,
        options: {
          scaffold: true
        }
      });
    },
    views: function() {
      this.composeWith('kona:views', {
        args: this.arguments,
        options: {
          scaffold: true
        }
      });
    },
    routes: function() {
      var root = this.destinationRoot(),
          routesFilePath = path.join('config', 'routes.js'),
          resourceName = this._.pluralize(this.name.toLowerCase()),
          route = "  router.resource('" + resourceName + "');",
          routeRegex = new RegExp('router\\.resource\\(\(\'|"\)' + resourceName, 'g'),
          contents,
          parts;

      contents = this.readFileAsString(routesFilePath);
      parts = contents.split(/^\}\s*$/gm);

      if (!parts.length) {
        throw new Error('unable to parse routes.js! Check the syntax?');
        return;
      } else if (routeRegex.test(contents)) {
        return;
      } else {
        parts[parts.length - 2] += route;
        contents = parts.join("\n}");
        this.write(routesFilePath, contents);
      }
    }
  },

  end: function () {}
});

module.exports = KonaScaffoldGenerator;
