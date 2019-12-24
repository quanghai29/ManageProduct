//import alert from 'alert-node'

module.exports = (req, res, next) => {
    if (req.session.isAuthenticated === false)
      return res.redirect(`/user/login?retUrl=${req.originalUrl}`);
      //Ngăn chặn tới những quyền tối cao của admin
    if(req.session.role !== 1)
    {
      return res.redirect('/alert');
      // var err = new Error('errRoleAdmin');
      // err.status = 401;
      // return next(err);
    }
    next();
 }
  