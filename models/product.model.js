const db = require('../utils/db');

module.exports = {
    all: id => db.load(`select * from sanpham`),
    add: entity => db.add('sanpham', entity),
    getPro: id => db.loadOnePro(`select * from sanpham where id = ${id}`),
    del: id => db.delete(`delete from sanpham where id = ${id}`),
    patch: entity => {
        const condition = { id: entity.id };
        delete entity.id;
        console.log(condition, entity);
        return db.patch('sanpham', entity, condition);
    },
    search: key => db.search(`select * from sanpham where tensanpham like '${key}'`),
    storage: () => db.load(`select tensanpham, sl from sanpham order by sl desc limit 6`),
    sumLimit: () => db.load(`select sum(tong.sl) as sl
    from
    (SELECT tensanpham, sl
    FROM book_manager.sanpham
    order by sl desc limit 6) as tong`),
    sum: () => db.load(`select sum(sl) as sl from sanpham`)
};
