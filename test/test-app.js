/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('kona:app', function () {
  before(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'kona:controller']
    ];
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withArguments(['test'])
      .withGenerators(deps)
      .on('end', done);
  });

  it('creates files', function () {
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
