//const restrict = require('../middlewares/auth.mdw');

module.exports = function (app) {
  app.use('/', require('../routes/index'));
  app.use('/user', require('../routes/users'));
};