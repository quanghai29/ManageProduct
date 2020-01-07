var productModel = require('../models/product.model');
var cartModel = require('../models/cart.model');
var categoryModel = require('../models/category.model');
var orderModel = require('../models/order.model');
var detailModel = require('../models/order_detail.model');

const handlebars= require('handlebars');

// handlebars.registerHelper("cate_select",(selectedCateID, cate_list)=>{
//   let html = "";
//   cate_list.forEach(function(item) { 
//     if(item.id_theloai == selectedCateID)
//     {
//       html = html + '<option selected value="'+item.id_theloai+'">'+ item.ten + '</option>';
//     }
//     else{
//       html = html + '<option value="'+item.id_theloai+'">'+item.ten+'</option>';
//     } });
//     return new handlebars.SafeString(html);
// });

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
  const dataOrder = orderModel.add(req.body);

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
    arr[i].sl = item['sl'];
    arr[i].thanhtien = item['tongtien'];
    i++;
  };
  
  cartModel.clear();

  


  res.redirect('cart');
};