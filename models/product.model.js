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
        return db.patch('sanpham',entity,condition);
    }
};