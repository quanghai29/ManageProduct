var express = require('express');
var productModel= require('../models/product.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'Thống kê'});
});

router.get('/alert', function(req, res, next) {
  res.render('alert', {title : 'alert error'});
});
/* GET account page. */
router.get('/accounts', function(req, res, next) {
  res.render('accounts', {title : 'Tài khoản'});
});

/* GET products page. */
router.get('/products', async function(req, res, next) {
  const listproduct = await productModel.all();
  res.render('products',{
    title: 'Sản phẩm',
    listproduct
  });
});

/* GET add-product page. */
router.get('/add-product', function(req, res, next) {
  res.render('add-product', {title : 'Thêm sản phẩm'});
});

/* POST add-product page. */
router.post('/add-product', async function(req, res, next) {
  const dataProduct = await productModel.add(req.body);
  res.redirect('products');
});

/* GET edit-product page. */
router.get('/edit-product', async function(req, res, next) {
  //console.log(req.query.id);
  const dataProduct = await productModel.getPro(req.query.id);
  //console.log(dataProduct[0]);
  res.render('edit-product', {title : 'Chỉnh sửa sản phẩm', item: dataProduct[0]});
  
});

/* POST edit-product page. */
router.post('/edit-product', async function(req, res, next) {
  const dataProduct = await productModel.patch(req.body);
  res.redirect('products');
});

/* GET delete-product page. */
router.get('/delete-product', function(req, res, next) {
  productModel.del(req.query.id);
  res.redirect('products');
});

/* GET day page. */
router.get('/day', function(req, res, next) {
  res.render('day');
});

/* GET week page. */
router.get('/week', function(req, res, next) {
  res.render('week', {title : 'Báo cáo theo ngày'});
});

/* GET month page. */
router.get('/month', function(req, res, next) {
  res.render('month', {title : 'Báo cáo theo tháng'});
});

/* GET quarter page. */
router.get('/quarter', function(req, res, next) {
  res.render('quarter', {title : 'Báo cáo theo quý'});
});

/* GET year page. */
router.get('/year', function(req, res, next) {
  res.render('year', {title : 'Báo cáo theo năm'});
});

module.exports = router;
