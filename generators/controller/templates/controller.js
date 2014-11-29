var path = require('path');<% if (require) { %>
var <%= baseCtrlName %> = require('./<%= _.slugify(_.underscore(baseCtrlName)) %>');
<% } %>

var <%= _.titleize(name) %>Controller = <%= baseCtrlName %>.extend({

  constructor: function() {
    <%= baseCtrlName %>.apply(this, arguments);<% if (options.scaffold) { %>
    this.respondsTo('html', 'json');<% } %>
  }<% if (options.scaffold) { %>,

  index: function* () {
    var <%= name %> = [];
    this.set('<%= name %>', <%= name %>);
    yield this.respondWith(<%= name %>);
  },

  show: function* () {
    var <%= singularName %> = {};
    this.set('<%= singularName %>', <%= singularName %>);
    yield this.respondWith(<%= singularName %>);
  },

  add: function* () {
    var <%= singularName %> = {};
    this.set('<%= singularName %>', <%= singularName %>);
    yield this.respondWith(<%= singularName %>);
  },

  edit: function* () {
    var <%= singularName %> = {};
    this.set('<%= singularName %>', <%= singularName %>);
    yield this.respondWith(<%= singularName %>);
  },

  create: function* () {
    yield this.redirect('index');
  },

  update: function* () {
    yield this.redirect('show');
  },

  destroy: function* () {
    yield this.render({status: 200, nothing: true});
  }<% } %><% _.each(actions, function(action) { %>,

  <%= action %>: function*() {

  }<% }) %>

});

module.exports = <%= _.titleize(name) %>Controller;