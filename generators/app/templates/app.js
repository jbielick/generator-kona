var Kona = require('kona');
var app = new Kona({root: __dirname});

app.initialize().on('ready', function() {
  this.listen();
});