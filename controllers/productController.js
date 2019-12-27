var productModel = require('../models/product.model');
var categoryModel = require('../models/category.model');

const handlebars= require('hbs');

module.exports.showProduct = async (req, res, next) => {
  const [listproduct, listcate] = await Promise.all([
      productModel.all(),
      categoryModel.all()
    ]) 
  //console.log(listproduct);
  //console.log(listcate);
  res.render('products',{
    title: 'Sản phẩm',
    listproduct,
    listcate
  });
}

module.exports.getAdd = (req, res, next) => {
  res.render('add-product', {title : 'Thêm sản phẩm'});
}

module.exports.postAdd = async (req, res, next) => {
  const dataProduct = await productModel.add(req.body);
  res.redirect('products');
}

module.exports.getEditPro = async (req, res, next) => {
  //console.log(req.query.id);
  const dataProduct = await productModel.getPro(req.query.id);
  //console.log(dataProduct[0]);
  res.render('edit-product', {title : 'Chỉnh sửa sản phẩm', item: dataProduct[0]});  
}

module.exports.postEditPro = async (req, res, next) => {
  const dataProduct = await productModel.patch(req.body);
  res.redirect('products');
}

module.exports.delPro = (req, res, next) => {
  productModel.del(req.query.id);
  res.redirect('products');
}

module.exports.search = async (req, res, next) => {
  let key = req.query.search;
  let temp = '%'+req.query.search+'%';
  const listproduct = await productModel.search(temp);
  res.render('search', {
    title: 'Tìm kiếm sản phẩm', 
    listproduct,
    key
  });
}

module.exports.addCate = async (req, res, next) => {
  const dataCate = await categoryModel.add(req.body);
  res.redirect('products');
}

module.exports.editCate = async (req, res, next) => {
  const dataCate = await categoryModel.patch(req.body);
  res.redirect('products');
}

module.exports.delCate = (req, res, next) => {
  categoryModel.del(req.query.id);
  res.redirect('products');
}