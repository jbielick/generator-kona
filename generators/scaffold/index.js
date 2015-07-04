'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var NameParser = require('../../mixins/name-parser');

var KonaScaffoldGenerator = yeoman.generators.NamedBase.extend({

  constructor: function() {
    this.constructor.__super__.constructor.apply(this, arguments);
    this.parseName(this.name);
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

      var root = this.destinationRoot();
      var routesFilePath = path.join('config', 'routes.js');
      var route = "  router.resource('" + this.slugged + "');";
      var routeRegex;
      var contents;
      var parts;

      routeRegex = new RegExp('router\\.resource\\(\(\'|"\)' + this.slugged, 'g');

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

NameParser(KonaScaffoldGenerator);

module.exports = KonaScaffoldGenerator;
