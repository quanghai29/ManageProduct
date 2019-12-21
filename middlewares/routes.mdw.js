//const restrict = require('../middlewares/auth.mdw');

module.exports = function (app) {
  app.use('/', require('../routes/index'));
};