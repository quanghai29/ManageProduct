module.exports = (req, res, next) => {
    if (req.session.isAuthenticated === false)
      return res.redirect(`/user/login?retUrl=${req.originalUrl}`);
      //Ngăn chặn tới những quyền tối cao của admin
    if(req.session.role === 2 )
    {
        return res.redirect('/alert');
    }
    next();
}
  