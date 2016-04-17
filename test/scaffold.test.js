/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require("fs");

describe('kona:scaffold', function () {
  before(function (done) {

    var deps = [
      [helpers.createDummyGenerator(), 'kona:controller'],
      [helpers.createDummyGenerator(), 'kona:views']
    ];

    helpers.run(path.join(__dirname, '../generators/scaffold'))
      .inDir(path.join(os.tmpDir(), 'scaffold-test'), function(dir) {
        fs.mkdirSync(path.join(dir, 'app'));
        fs.createReadStream(path.join(__dirname, '../generators/app/templates/app/routes.js'))
          .pipe(fs.createWriteStream(path.join(dir, './app/routes.js')));
      })
      .withArguments(['resource'])
      .withOptions({force: true})
      .withGenerators(deps)
      .on('end', done);
  });

  xit('adds a resource route', function () {
    assert.fileContent('app/routes.js', /router\.get\('\/resources\/:id'\)/);
    assert.fileContent('app/routes.js', /router\.post\('\/resources'\);/);
    assert.fileContent('app/routes.js', /router\.put\('\/resources\/:id'\);/);
    assert.fileContent('app/routes.js', /router\.patch\('\/resources\/:id'\);/);
    assert.fileContent('app/routes.js', /router\.delete\('\/resources\/:id'\);/);
  });
});
