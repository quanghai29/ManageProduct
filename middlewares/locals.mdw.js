const productModel = require('../models/product.model');

module.exports = function (app) {
  app.use(async (req, res, next) => {
    // const rows = await categoryModel.allWithDetails();
    // res.locals.lcCategories = rows;

    // if (typeof (req.session.isAuthenticated) === 'undefined') {
    //   req.session.isAuthenticated = false;
    // }
    // res.locals.isAuthenticated = req.session.isAuthenticated;
    // res.locals.authUser = req.session.authUser;
    // res.locals.role=req.session.role;
    // if(res.locals.role===1)
    // {
    //    res.locals.bidder=true;
    //    console.log(`bidder` + res.locals.bidder);
    // }
    // else if(res.locals.role===2)
    // {
    //    res.locals.seller=true;
    //    console.log('seller' + res.locals.seller);
    // }
    // else if(res.locals.role===3)
    // {
    //    res.locals.admin=true;
    //    console.log('admin' + res.locals.admin);
    // }
    // else{
    //   res.locals.bidder=false;
    //   res.locals.seller=false;
    //   res.locals.admin=false;
    // }
    next();
  })
};
