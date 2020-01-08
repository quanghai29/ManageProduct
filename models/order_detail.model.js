const db = require('../utils/db');

module.exports = {
    all: id => db.load(`select * from ct_donhang`),
    add: entity => db.add('ct_donhang', entity),
    del: id => db.delete(`delete from ct_donhang where id_donhang = ${id}`),
    getDetailOrder: id => db.load(`select * from ct_donhang where id_donhang = ${id}`),
    patch: entity => {
        const condition = { id_donhang: entity.id_donhang, id_sanpham: entity.id_sanpham };
        delete entity.id;
        console.log(condition, entity);
        return db.patch('ct_donhang', entity, condition);
    },
    revenue: (thang, nam, ten)=> {
        return db.load(`SELECT month(dh.ngaylap) as thang, year(dh.ngaylap) as nam,sp.tensanpham , sum(ct.sl) as sl 
    FROM ct_donhang ct inner join donhang dh on ct.id_donhang = dh.id inner join sanpham sp on sp.id = ct.id_sanpham
    group by month(dh.ngaylap), year(dh.ngaylap), sp.tensanpham
    having sp.tensanpham = '${ten}' and thang = ${thang} and nam = ${nam}`)},
    topProduct:()=>db.load(`select distinct tensanpham
    from ct_donhang ct inner join donhang dh on ct.id_donhang = dh.id inner join sanpham sp on sp.id = ct.id_sanpham
    order by ngaylap desc
    limit 6`),
    revenueMonth:date=>db.load(`SELECT sp.tensanpham, sum(ct.sl) as tongsl, sum(ct.thanhtien) as tongtien
    from ct_donhang ct inner join sanpham sp on ct.id_sanpham = sp.id inner join donhang dh on ct.id_donhang=dh.id
    where year(dh.ngaylap) = ${date.year} and month(dh.ngaylap) = ${date.month}
    group by ct.id_sanpham`)
};