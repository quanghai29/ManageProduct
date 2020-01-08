var express = require('express');
var productModel = require('../models/product.model');
var categoryModel = require('../models/category.model');
const userModel = require('../models/user.model');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const orderModel= require('../models/order.model');
const detailModel =require('../models/order_detail.model');
const authRole =require('../middlewares/auth.mdw');
const roleAdmin = require('../middlewares/authAdmin.mdw');
const roleSeller = require('../middlewares/authSeller.mdw');
const roleWareHouse = require('../middlewares/authWarehouse.mdw');
var router = express.Router();

/* GET home page. */
router.get('/',authRole, async function(req, res, next) {
  const data1 = await orderModel.revenue();
  var datas={};
  datas.revenue = {};  
  datas.revenue_count = {};
  datas.revenue.labels = [];  
  datas.revenue.values = [];
  datas.revenue_count.labels = [];
  datas.revenue_count.properties = [];

  //revenue
  for ( i of data1)
  {
    datas.revenue.labels.push(i.thang+ '/' + i.nam);
    datas.revenue.values.push(i.doanhthu);
  }

  //count

  const topDate = await orderModel.topDate();
  for ( i of topDate)
  {
    datas.revenue_count.labels.push(i.thang+ '/' + i.nam);
  }


  const topProduct = await detailModel.topProduct();
  for (i of topProduct)
  {
    var sl = [];
    for (j of topDate)
    {
      gtsl = await detailModel.revenue(j.thang, j.nam, i.tensanpham);

      if (gtsl.length == 0)
        sl.push(0);
        else{

          for( i of gtsl)
          {
            sl.push(i.sl);
            break;
          }
        }
    }
    const property = {
    label: i.tensanpham,
    data: sl,
    fill: false,
    borderColor: "rgb("+ Math.floor((Math.random() * 255))+","+ Math.floor((Math.random() * 255))+"," +Math.floor((Math.random() * 255))+")",
    cubicInterpolationMode: "monotone",
    pointRadius: 0
    }
    datas.revenue_count.properties.push(property);
  }

  //storage
  const storage = await productModel.storage();

  datas.storage = {};
  datas.storage.labels =[];
  datas.storage.values = [];
  for ( i of storage)
  {
    datas.storage.labels.push(i.tensanpham);
    datas.storage.values.push(i.sl);
  }

  datas.storage.labels.push("Khác");
  gtsl = 0;
  sum = await productModel.sum();
    if (sum.length == 0)
        gtsl += 0;
        else{

          for( i of sum)
          {
            gtsl += i.sl;
            break;
          }
        }
  sumLimit = await productModel.sumLimit();

        if (sumLimit.length == 0)
        gtsl -= 0;
        else{

          for( i of sumLimit)
          {
            gtsl -= i.sl;
            break;
          }
        }
    
    datas.storage.values.push(gtsl);
   // console.log(gtsl);
//---
  
  const json = JSON.stringify(datas);

  //danh sách member
  const member= await userModel.getUserName();
  
  res.render('index', {
    title : 'Thống kê',
    member,
    json
  });
});

router.get('/',orderController.showChart);


/* GET account page. */
router.get('/accounts',authRole,async function(req, res, next) {
  const users = await userModel.allName();
  const json = JSON.stringify(users);
  
  res.render('accounts', {title : 'Tài khoản', users: users, json: json});
});

router.post('/accounts',authRole, async  function(req, res, next){
  userInfo = req.body;
  await userModel.patch(userInfo);
  res.redirect('/accounts');
});

/* GET products page. */
router.get('/products',authRole, productController.showProduct);

/* GET cart page. */
router.get('/cart',roleSeller, cartController.showCart);

/* GET add-cart page. */
router.get('/add-cart',roleSeller, cartController.getAdd);
/* POST add-cart page. */
router.post('/add-cart',authRole, cartController.postAdd);

/* POST list-order page. */
router.post('/list-order',authRole, cartController.postAddOrder);
/* GET list-order page. */
router.get('/list-order', function(req, res, next) {
  res.render('list-order');
});
/* GET edit-order page. */
router.get('/edit-order',authRole, cartController.editOrder);
/* GET cart-info page. */
router.get('/cart-info',authRole, cartController.cartInfo);
/* GET delete-order page. */
router.get('/delete-order',authRole, cartController.delOrder);

/* get add-category. */
router.get('/search-order',authRole, cartController.searchOrder);

/* GET search-product page. */
router.get('/search-cart',authRole, cartController.search);
/* GET delete-cart page. */
router.get('/delete-cart',authRole, cartController.delCart);

/* GET add-product page. */
router.get('/add-product',roleWareHouse, productController.getAdd);

/* POST add-product page. */
router.post('/add-product', productController.postAdd);

/* GET edit-product page. */
router.get('/edit-product',roleWareHouse, productController.getEditPro);

/* POST edit-product page. */
router.post('/edit-product', productController.postEditPro);

/* GET delete-product page. */
router.get('/delete-product',roleWareHouse, productController.delPro);

/* GET search-product page. */
router.get('/search-product',authRole, productController.search);

/* POST add-category. */
router.post('/add-category', productController.addCate);

/* POST edit-category page. */
router.post('/edit-category', productController.editCate);

/* GET delete-category page. */
router.get('/delete-category',roleWareHouse, productController.delCate);


/* GET day page. */
router.get('/day',roleAdmin, function(req, res, next) {
  res.render('day');
});

/* GET week page. */
router.get('/week',roleAdmin, function(req, res, next) {
  res.render('week', {title : 'Báo cáo theo ngày'});
});

/* GET month page. */
router.get('/month', roleAdmin,orderController.revenueMonth);

/* GET quarter page. */
router.get('/quarter',roleAdmin, function(req, res, next) {
  res.render('quarter', {title : 'Báo cáo theo quý'});
});

/* GET year page. */
router.get('/year',roleAdmin, function(req, res, next) {
  res.render('year', {title : 'Báo cáo theo năm'});
});

router.get('/alert', async (req, res) => {
  res.render('alert',{
    title: 'Alert'
  });
});

module.exports = router;
