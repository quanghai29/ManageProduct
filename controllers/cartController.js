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
  req.body['id_seller'] = req.session.role;
  console.log(req.body);
  console.log(req.body.id_product);
  console.log(req.body.sl);
  var err = 0;
  var errValidISBN=false;
  if(req.body.id_product == '' || req.body.sl == '' ){
    err = 1;
    const listProduct = await  productModel.all();
    res.render('add-cart', {title : 'Thêm giỏ hàng', listProduct, err});
  }
  else{
    const row = await productModel.getPro(req.body.id_product);
    //Kiểm tra sản phẩm có tồn tại hay không
    if(row.length === 0 )
    {
      errValidISBN=true;
    }
    else
    {
      if(row[0].sl - req.body.sl >= 0){
        const dataProduct = await cartModel.add(req.body);
      }
      else{
        err = 1;
      }
    }

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
      thanhtien,
      err,
      errValidISBN
    });
  }
  
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
  req.body['id_seller'] = req.session.role;
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
  //console.log(dataOrder);
  
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
    var en = new Object();
    en.id = arr[i].id_sanpham;
    en.sl = oldsl[0].sl - arr[i].sl;
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

  const order = await detailModel.getDetailOrder(req.query.id);
  detailModel.del(req.query.id);
  for(item of order){
    const oldsl = await productModel.getPro(item.id_sanpham);
    var en = new Object();
    en.id = item.id_sanpham;
    en.sl = oldsl[0].sl + item.sl;
    await productModel.patch(en);
  }

  listorder = await orderModel.all();
  listdetailorder = await detailModel.all();

  res.render('list-order',{
    title: 'Danh sách đơn hàng',
    listorder,
    listdetailorder
  });
}

module.exports.editOrder = async(req, res, next) => {
  const order = await detailModel.getDetailOrder(req.query.id);
  //console.log(order);
  var arr = new Object();
  
  let i = 0;
  cartModel.clear();
  for(item of order){
    arr.id_seller = req.session.role;
    arr.id_product = item.id_sanpham;
    arr.sl = item.sl;
    //console.log(arr);
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
    title: 'Thôg tin đơn hàng',
    listproduct,
    listcate,
    thanhtien
  });
}

module.exports.cartInfo = async(req, res, next) => {
  await cartModel.clear();
  const listorder = await orderModel.all();
  listdetailorder = await detailModel.all();
  res.render('list-order',{
    title:'Danh sách đơn hàng', 
    listorder,
    listdetailorder
  });
}

module.exports.listOrder = async(req, res, next) => {
  listorder = await orderModel.all();
  listdetailorder = await detailModel.all();

  res.render('list-order',{
    title: 'Danh sách đơn hàng',
    listorder,
    listdetailorder
  });
}

module.exports.searchOrder = async (req, res, next) => {
  let id = +req.query.search;
  let err = 0;
  const list = await orderModel.search(id);
  if(list[0] == null){
    err = 1;
    listorder = await orderModel.all();
  }
  else{
    listorder = await orderModel.search(id);
  }
  res.render('list-order', {
    title: 'Tìm kiếm đơn hàng', 
    listorder,
    id,
    err
  });
}

