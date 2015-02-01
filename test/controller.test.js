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
        named: 'Birds'
      },{
        arg: 'postal-codes',
        file: 'postal-codes',
        named: 'PostalCodes'
      },{
        arg: 'geoCodes',
        file: 'geo-codes',
        named: 'GeoCodes'
      }
    ].forEach(function(config) {

      it('creates a ' + config.named + ' controller', function(done) {
        getRunner().withArguments([config.arg])
          .on('end', function() {
            // console.log(fs.readdirSync(tmp + '/app/controllers'));
            var filepath = 'app/controllers/' + config.file + '-controller.js'
            assert.file(filepath);
            // console.log(fs.readFileSync(filepath).toString());
            assert.fileContent(filepath, new RegExp(config.named + 'Controller', 'g'));
            done();
          });
      });

    });

    it('adds arguments as action names', function(done) {

      getRunner().withArguments(['bro', 'fist-bump', 'collarPop'])
        .on('end', function() {
          var filepath = 'app/controllers/bros-controller.js'
          assert.fileContent(filepath, /fistBump:\sfunction\*\(/);
          assert.fileContent(filepath, /collarPop:\sfunction\*\(/);
          done();
        });

    });

    it('extends the application controller', function(done) {

      getRunner().withArguments(['hat']).on('end', function() {
        var filepath = getControllerPath('hats');
        assert.fileContent(filepath, /ApplicationController\.extend/);
        done();
      });

    });
  });

  describe('application controller', function() {
    it('doesn\'t modify the name of application controller', function(done) {
      getRunner().withArguments(['Application'])
        .on('end', function() {
          var filepath = getControllerPath('application');
          assert.fileContent(filepath, /ApplicationController/);
          assert.fileContent(filepath, /kona\.Controller\.Base\.extend/);
          done();
        });
    });
  });

});

function getRunner() {
  return helpers.run(path.join(__dirname, '../generators/controller')).inDir(tmp)
}

function getControllerPath(name) {
  return 'app/controllers/' + name + '-controller.js'
}