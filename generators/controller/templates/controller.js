var path = require('path');<% if (require) { %>
var <%= baseCtrlName %> = require('./<%= _.slugify(_.underscore(baseCtrlName)) %>');
<% } %>

var <%= name %>Controller = <%= baseCtrlName %>.extend({
  constructor: function (params) {
    <%= baseCtrlName %>.apply(this, arguments);
  }
});

module.exports = <%= name %>Controller;