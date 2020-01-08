
var productModel = require('../models/product.model');
var cartModel = require('../models/cart.model');
var categoryModel = require('../models/category.model');
var orderModel = require('../models/order.model');
var detailModel = require('../models/order_detail.model');

const handlebars= require('handlebars');

module.exports.showChart = async function(req, res, next) {
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
      //---
      
        const json = JSON.stringify(datas);
        
        res.render('index', {title : 'Thống kê',json});
      }
module.exports.revenueMonth = async function(req, res, next) {
  d = new Date();
  m = d.getMonth()+1;
  y = d.getYear()+1900;
  
  data = await detailModel.revenueMonth({month: m, year: y});
  res.render('month', {title : 'Báo cáo theo tháng',data});
}