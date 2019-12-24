const db = require('../utils/db');

module.exports = {
    //all: id => db.load(`select * from sanpham`),
    add: entity => db.add('members', entity),
    singleByUsername: async username => {
        const rows = await db.load(`select * from members where username = '${username}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];
      },
    // getPro: id => db.loadOnePro(`select * from sanpham where ProID = ${id}`),
    // del: id => db.delete(`delete from sanpham where ProID = ${id}`),
    // patch: entity => {
    //     const condition = { ProID: entity.ProID };
    //     delete entity.ProID;
    //     console.log(condition, entity);
    //     return db.patch('sanpham',entity,condition);
    // }
};