var express = require('express');
var productModel= require('../models/product.model');
var categoryModel= require('../models/category.model');
const userModel = require('../models/user.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'Thống kê'});
});

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
router.get('/products', async function(req, res, next) {
  const [listproduct, listcate] = await Promise.all([
      productModel.all(),
      categoryModel.all()
    ]) 
  //console.log(listproduct);
  console.log(listcate);
  res.render('products',{
    title: 'Sản phẩm',
    listproduct,
    listcate
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

/* GET search-product page. */
router.get('/search-product', async function(req, res, next) {
  let key = req.query.search;
  let temp = '%'+req.query.search+'%';
  const listproduct = await productModel.search(temp);
  res.render('search', {
    title: 'Tìm kiếm sản phẩm', 
    listproduct,
    key
  });
});

/* POST add-category. */
router.post('/add-category', async function(req, res, next) {
  const dataCate = await categoryModel.add(req.body);
  res.redirect('products');
});

/* POST edit-category page. */
router.post('/edit-category', async function(req, res, next) {
  const dataCate = await categoryModel.patch(req.body);
  res.redirect('products');
});

/* GET delete-category page. */
router.get('/delete-category', function(req, res, next) {
  categoryModel.del(req.query.id);
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
