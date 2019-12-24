//const restrict = require('../middlewares/auth.mdw');

module.exports = function (app) {
   app.use('/user', require('../routes/users.js'));
  app.use('/', require('../routes/index.js'));
 
};