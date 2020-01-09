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
    allName:() => {return db.load('select username, ten, email, sdt, password from members');},
    getUserName:()=> db.load(`select username,ten,tenloai  from members as m inner join loai_member as l on m.loai=l.id `),
    // getPro: id => db.loadOnePro(`select * from sanpham where ProID = ${id}`),
    // del: id => db.delete(`delete from sanpham where ProID = ${id}`),
    patch: entity => {
        const condition = { username: entity.username };
        if(entity.password == "")
            delete entity.password;
        delete entity.username;
        delete entity.password2;
        db.patch('members',entity,condition);
    },
    getLuong:()=> db.load(`select sum(luong) as luong from members`)
};