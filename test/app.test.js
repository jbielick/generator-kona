/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var tmp = path.join(os.tmpdir(), __filename);

describe('kona:app', function () {

  describe('with app name argument', function() {
    before(function (done) {
      getRunner().withArguments(['testApp']).on('end', done);
    });

    it('creates an app', function () {
      assert.file([
        'bower.json',
        'package.json',
        'app.js',
        'config/application.js',
        'config/routes.js',
        '.bowerrc',
        'public/images/grind.jpg',
        'public/favicon.ico',
        'app/controllers/main-controller.js',
        'app/views/main/home.html',
        'app/views/layouts/application.html',
        'app/views/errors/error.html'
      ]);
    });
  });

  describe('without app name argument and providing one', function() {
    before(function(done) {
      getRunner()
        .withPrompts({confirmAppName: false, appName: 'custom'})
        .on('end', done);
    });

    it('prompts for a name and creates with it', function() {
      assert.file(path.join(tmp, 'custom'));
    });
  });

  describe('without app name, confirming the default', function() {
    before(function(done) {
      getRunner()
        .withPrompts({confirmAppName: true})
        .on('end', done);
    });

    it('prompts for a name and creates with it', function() {
      assert.file(path.join(tmp, 'apptestjs'));
    });
  });
});


function getRunner() {
  var deps = [
    [helpers.createDummyGenerator(), 'kona:controller']
  ], gen;
  return helpers.run(path.join(__dirname, '../generators/app'))
    .inDir(tmp)
    .withOptions({ 'skip-install': true })
    .withGenerators(deps)
}