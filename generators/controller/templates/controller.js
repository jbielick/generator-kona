var <%= baseCtrlName %> = require('<%= baseCtrlPath %>');

var <%= classified %>Controller = <%= baseCtrlName %>.extend({

  constructor: function() {
    <%= baseCtrlName %>.apply(this, arguments);<% if (options.scaffold) { %>
    this.respondsTo('html', 'json');<% } %>
  }<% if (options.scaffold) { %>,

  index: function* () {
    var <%= camelized %> = [];
    this.set('<%= camelized %>', <%= camelized %>);
    yield this.respondWith(<%= camelized %>);
  },

  show: function* () {
    var <%= singularCamel %> = {};
    this.set('<%= singularCamel %>', <%= singularCamel %>);
    yield this.respondWith(<%= singularCamel %>);
  },

  add: function* () {
    var <%= singularCamel %> = {};
    this.set('<%= singularCamel %>', <%= singularCamel %>);
    yield this.respondWith(<%= singularCamel %>);
  },

  edit: function* () {
    var <%= singularCamel %> = {};
    this.set('<%= singularCamel %>', <%= singularCamel %>);
    yield this.respondWith(<%= singularCamel %>);
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

module.exports = <%= classified %>Controller;