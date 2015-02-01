var Kona = require('kona');
var app = new Kona({appPath: __dirname});

app.initialize().on('ready', function() {
  this.listen();
});