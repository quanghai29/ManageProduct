var productModel = require('../models/product.model');
var cartModel = require('../models/cart.model');
var categoryModel = require('../models/category.model');

const handlebars= require('handlebars');

handlebars.registerHelper("cate_select",(selectedCateID, cate_list)=>{
  let html = "";
  cate_list.forEach(function(item) { 
    if(item.id_theloai == selectedCateID)
    {
      html = html + '<option selected value="'+item.id_theloai+'">'+ item.ten + '</option>';
    }
    else{
      html = html + '<option value="'+item.id_theloai+'">'+item.ten+'</option>';
    } });
    return new handlebars.SafeString(html);
});

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
