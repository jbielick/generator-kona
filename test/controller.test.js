/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

var tmp = path.join(os.tmpdir(), 'test-controller');

describe('kona:controller', function () {

  describe('named controllers', function() {
    [
      {
        arg: 'bird',
        file: 'birds',
        named: 'Birds',
        camel: 'birds'
      },{
        arg: 'postal-codes',
        file: 'postal-codes',
        named: 'PostalCodes',
        camel: 'postalCodes'
      },{
        arg: 'postCodes',
        file: 'post-codes',
        named: 'PostCodes',
        camel: 'postCodes'
      },{
        arg: 'geoCodeRegion',
        scaffold: true,
        file: 'geo-code-regions',
        named: 'GeoCodeRegions',
        camel: 'geoCodeRegions'
      }
    ].forEach(function(config) {

      it('creates a ' + config.named + ' controller', function(done) {

        getRunner()
          .withArguments([config.arg].concat(config.scaffold ? ['--scaffold'] : []))
          .on('end', function() {
            // console.log(fs.readdirSync(tmp + '/app/controllers'));
            var filepath = getControllerPath(config.file);
            assert.file(filepath);
            // console.log(fs.readFileSync(filepath).toString());
            assert.fileContent(filepath, new RegExp(config.named + 'Controller', 'g'));
            if (config.scaffold) {
              [
                new RegExp('var ' + config.camel + ' =', 'g'),
                new RegExp('var ' + config.camel.slice(0, config.camel.length - 1) + ' =', 'g'),
                /add: function*/,
                /index: function*/,
                /show: function*/,
                /edit: function*/,
                /create: function*/,
                /update: function*/,
                /destroy: function*/
              ].forEach(function(pattern) {
                assert.fileContent(filepath, pattern);
              });
            }
            done();
          });
      });

    });

    it('adds arguments as action names', function(done) {

      getRunner()
        .withArguments(['bro', 'fist-bump', 'collarPop'])
        .on('end', function() {
          var filepath = getControllerPath('bros');
          assert.fileContent(filepath, /fistBump:\sfunction\*\(/);
          assert.fileContent(filepath, /collarPop:\sfunction\*\(/);
          done();
        });

    });

    it('extends the application controller', function(done) {

      getRunner()
        .withArguments(['hat'])
        .on('end', function() {
          var filepath = getControllerPath('hats');
          assert.fileContent(filepath, /ApplicationController\.extend/);
          done();
        });

    });
  });

  describe('application controller', function() {
    it('doesn\'t modify the name of application controller', function(done) {
      getRunner()
        .withArguments(['Application'])
        .on('end', function() {
          var filepath = getControllerPath('application');
          assert.fileContent(filepath, /ApplicationController/);
          assert.fileContent(filepath, /kona\/lib\/controller\//);
          done();
        });
    });
  });

});

function getRunner() {
  return helpers.run(path.join(__dirname, '../generators/controller')).inDir(tmp);
}

function getControllerPath(name) {
  return 'app/controllers/' + name + '-controller.js';
}