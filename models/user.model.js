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
    // getPro: id => db.loadOnePro(`select * from sanpham where ProID = ${id}`),
    // del: id => db.delete(`delete from sanpham where ProID = ${id}`),
    patch: entity => {
        const condition = { username: entity.username };
        if(entity.password==entity.password2)
        {
          if(entity.password == "")
            delete entity.password;
          delete entity.username;
          delete entity.password2;
          console.log(condition, entity);
          db.patch('members',entity,condition);
          
        }
        else{
          console.log("update user failed!");
          
        }
    }
};