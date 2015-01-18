var Kona = require('kona');
var app = new Kona();

app.initialize().on('ready', function() {
  this.listen(process.env.PORT);
});