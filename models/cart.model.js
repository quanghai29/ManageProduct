const db = require('../utils/db');

module.exports = {
    all: id => db.load(`select sanpham.id,sanpham.tensanpham, sanpham.img, sanpham.dongia, cart.sl, sanpham.dongia * cart.sl as tongtien, cart.id as id_cart from sanpham join cart on sanpham.id = cart.id_product`),
    add: entity => db.add('cart', entity),
    del: id => db.delete(`delete from cart where id = ${id}`),
    clear: () => db.delete(`delete from cart`),
    patch: entity => {
        const condition = { id: entity.id };
        delete entity.id;
        console.log(condition, entity);
        return db.patch('cart', entity, condition);
    },
    getOrder: id => db.load(`select * from cart where id = ${id}`),
    search: key => db.search(`select sanpham.id,sanpham.tensanpham, sanpham.img, sanpham.dongia, cart.sl, sanpham.dongia * cart.sl as tongtien, cart.id as id_cart from sanpham join cart on sanpham.id = cart.id_product where sanpham.tensanpham like '${key}'`),
};
