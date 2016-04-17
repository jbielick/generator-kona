var mainController = require('./controllers/main-controller');

module.exports = function(router) {

  router.get('root', '/', mainController.home);
  router.get('/pages/:path', mainController.show);

}