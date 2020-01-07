var productModel = require('../models/product.model');
var cartModel = require('../models/cart.model');
var categoryModel = require('../models/category.model');
var orderModel = require('../models/order.model');
var detailModel = require('../models/order_detail.model');

const handlebars= require('handlebars');

module.exports.showCart = async (req, res, next) => {
  const [listproduct, listcate] = await Promise.all([
    cartModel.all(),
    categoryModel.all()
    ]) 
    let thanhtien = 0;
    listproduct.forEach(function(entry) {
      thanhtien+= entry['tongtien'];
});

  res.render('cart',{
    title: 'Sản phẩm',
    listproduct,
    listcate,
    thanhtien
  });
}

module.exports.getAdd = async (req, res, next) => {
  const listProduct = await  productModel.all();
  res.render('add-cart', {title : 'Thêm giỏ hàng', listProduct});
}

module.exports.postAdd = async (req, res, next) => {
  console.log(req.body);
  req.body['id_seller'] = 1;
  const dataProduct = await cartModel.add(req.body);
  res.redirect('cart');
}


module.exports.delCart = (req, res, next) => {
  cartModel.del(req.query.id);
  res.redirect('cart');
}

module.exports.search = async (req, res, next) => {

  let key = req.query.search;
  let temp = '%'+req.query.search+'%';
  const [listproduct, listcate] = await Promise.all([
    cartModel.search(temp),
    categoryModel.all()
  ])
  let thanhtien = 0;
  listproduct.forEach(function(entry) {
    thanhtien+= entry['tongtien'];
});

res.render('cart',{
  title: 'Tìm Kiếm',
  listproduct,
  listcate,
  thanhtien,
  key
});
}

module.exports.postAddOrder = async (req, res, next) => { 
  const dataCart = await cartModel.all();
  req.body['id_seller'] = 1;
  let thanhtien = 0;
  dataCart.forEach(function(entry){
    thanhtien+= entry['tongtien'];
  });

  const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
  }

  req.body['ngaylap'] = toSqlDatetime(Date.now());

  req.body['tongtien'] = thanhtien;
  req.body['thue'] = thanhtien*0.1;
  const dataOrder = await orderModel.add(req.body);
  console.log(dataOrder);
  
  const idnow = await orderModel.idnow();
  let id = 0;
  idnow.forEach(function(entry){
    id = entry['id'];
  });

  var arr = [];
  let i = 0;
  for(item of dataCart){
    arr[i] = new Object();
    arr[i].id_donhang = id;
    arr[i].id_sanpham = item['id'];
    console.log(id);
    arr[i].sl = item['sl'];
    arr[i].thanhtien = item['tongtien'];
    await detailModel.add(arr[i]);
    const oldsl = await productModel.getPro(arr[i].id_sanpham);
    let old = 0;
    oldsl.forEach(function(entry){
      old = entry['sl'];
    });
    var en = new Object();
    en.id = arr[i].id_sanpham;
    en.sl = old - arr[i].sl;
    await productModel.patch(en);
    i++;
  };
  
  

  await cartModel.clear();
  listorder = await orderModel.all();
  listdetailorder = await detailModel.all();

  res.render('list-order',{
    title: 'Danh sách đơn hàng',
    listorder,
    listdetailorder
  });
};

module.exports.delOrder = async(req, res, next) => {
  orderModel.del(req.query.id);
  listorder = await orderModel.all();
  listdetailorder = await detailModel.all();

  const order = await detailModel.getDetailOrder(req.query.id);
  detailModel.del(req.query.id);
  for(item of order){
    const oldsl = await productModel.getPro(item.id_sanpham);
    let old = 0;
    oldsl.forEach(function(entry){
      old = entry['sl'];
    });
    var en = new Object();
    en.id = item.id_sanpham;
    en.sl = old + item.sl;
    await productModel.patch(en);
  }

  res.render('list-order',{
    title: 'Danh sách đơn hàng',
    listorder,
    listdetailorder
  });
}

module.exports.editOrder = async(req, res, next) => {
  const order = await detailModel.getDetailOrder(req.query.id);
  console.log(order);
  var arr = new Object();
  
  let i = 0;
  cartModel.clear();
  for(item of order){
    arr.id_seller = 1;
    arr.id_product = item.id_sanpham;
    arr.sl = item.sl;
    console.log(arr);
    await cartModel.add(arr);
    i++;
  };

  const [listproduct, listcate] = await Promise.all([
    cartModel.all(),
    categoryModel.all()
    ]) 
    let thanhtien = 0;
    listproduct.forEach(function(entry) {
      thanhtien+= entry['tongtien'];
});
  res.render('cart-info',{
    title: 'Sản phẩm',
    listproduct,
    listcate,
    thanhtien
  });
}

module.exports.cartInfo = async(req, res, next) => {
  await cartModel.clear();
  const listorder = await orderModel.all();
  res.render('list-order',{
    title:'Danh sách đơn hàng', 
    listorder
  });
}

