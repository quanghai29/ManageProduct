const db = require('../utils/db');


module.exports = {
    all: id => db.load(`select * from donhang`),
    add: entity => db.add('donhang', entity),
    del: id => db.delete(`delete from donhang where id = ${id}`),
    patch: entity => {
        const condition = { id: entity.id };
        delete entity.id;
        console.log(condition, entity);
        return db.patch('donhang', entity, condition);
    },

    search: id => db.search(`select * from donhang where id = ${id}`),

    idnow: () => db.load(`SELECT max(id) as id FROM donhang`),

    revenue: date => {
        console.log(date);
        
        return db.load(`select * from donhang where year(ngaylap) = ${date.year} and month(ngaylap) = ${date.month}`);
    },
    revenue: ()=> db.load(`select month(ngaylap) as thang, year(ngaylap) as nam, sum(tongtien) as doanhthu from donhang group by month(ngaylap), year(ngaylap) order by nam desc, thang desc limit 12`),
    topDate:() => db.load(`select *
    from (SELECT  year(ngaylap) as nam, month(ngaylap) as thang FROM donhang group by year(ngaylap), month(ngaylap) order by nam desc, thang desc limit 6) as date
    order by  date.nam asc, date.thang asc`),
};