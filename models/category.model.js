const db = require('../utils/db');

module.exports = {
    all: id => db.load(`select * from theloai`),
    add: entity => db.add('theloai', entity),
    del: id => db.delete(`delete from theloai where id_theloai = ${id}`),
    patch: entity => {
        const condition = { id_theloai: entity.id_theloai };
        delete entity.id_theloai;
        console.log(condition, entity);
        return db.patch('theloai', entity, condition);
    },
};
