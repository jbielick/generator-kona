var path = require('path');
var ApplicationController = require('./application-controller');

var MainController = ApplicationController.extend({
  home: function* (params) {},
  show: function* (params) {
    yield this.respondTo({
      html: function* () {
        yield this.render(params.path);
      }
    });
  }
});

module.exports = MainController;