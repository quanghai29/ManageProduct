var productModel = require('../models/product.model');
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

module.exports.getAdd = async (req, res, next) => {
  const listCate = await categoryModel.all();
  res.render('add-product', {title : 'Thêm sản phẩm', listCate});
}

module.exports.postAdd = async (req, res, next) => {
  const dataProduct = await productModel.add(req.body);
  res.redirect('products');
}

module.exports.getEditPro = async (req, res, next) => {
  //console.log(req.query.id);
  const [dataProduct, listcate] = await Promise.all([
    productModel.getPro(req.query.id),
    categoryModel.all()
    ]) 
  console.log(dataProduct[0]);
  console.log(listcate);
  res.render('edit-product', {title : 'Chỉnh sửa sản phẩm', item: dataProduct[0], listcate});  
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