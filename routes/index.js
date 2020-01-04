var express = require('express');
var productModel = require('../models/product.model');
var categoryModel = require('../models/category.model');
const userModel = require('../models/user.model');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
var router = express.Router();

/* GET home page. */
router.get('/',orderController.showChart);

router.get('/alert', function(req, res, next) {
  res.render('alert', {title : 'alert error'});
});
/* GET account page. */
router.get('/accounts',async function(req, res, next) {
  const users = await userModel.allName();
  const json = JSON.stringify(users);
  
  res.render('accounts', {title : 'Tài khoản', users: users, json: json});
});

router.post('/accounts', async  function(req, res, next){
  userInfo = req.body;
  await userModel.patch(userInfo);
  res.redirect('/accounts');
});

/* GET products page. */
router.get('/products', productController.showProduct);

/* GET add-product page. */
router.get('/add-product', productController.getAdd);

/* POST add-product page. */
router.post('/add-product', productController.postAdd);

/* GET edit-product page. */
router.get('/edit-product', productController.getEditPro);

/* POST edit-product page. */
router.post('/edit-product', productController.postEditPro);

/* GET delete-product page. */
router.get('/delete-product', productController.delPro);

/* GET search-product page. */
router.get('/search-product', productController.search);

/* POST add-category. */
router.post('/add-category', productController.addCate);

/* POST edit-category page. */
router.post('/edit-category', productController.editCate);

/* GET delete-category page. */
router.get('/delete-category', productController.delCate);


/* GET day page. */
router.get('/day', function(req, res, next) {
  res.render('day');
});

/* GET week page. */
router.get('/week', function(req, res, next) {
  res.render('week', {title : 'Báo cáo theo ngày'});
});

/* GET month page. */
router.get('/month',orderController.revenueMonth);

/* GET quarter page. */
router.get('/quarter', function(req, res, next) {
  res.render('quarter', {title : 'Báo cáo theo quý'});
});

/* GET year page. */
router.get('/year', function(req, res, next) {
  res.render('year', {title : 'Báo cáo theo năm'});
});

module.exports = router;
