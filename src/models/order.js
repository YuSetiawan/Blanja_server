const Pool = require('../config/db');

const selectAllOrder = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT order_list.id_order,order_list.size,order_list.quantity_order,product.name,product.photo,users.id
  FROM order_list JOIN product ON order_list.id_product = product.id
  JOIN users ON order_list.id_user = users.id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrder = (id_user) => {
  return Pool.query(`SELECT order_list.id_order, order_list.size, product.name, product.id AS id_product, order_list.quantity_order, product.price, product.price*order_list.quantity_order AS total_price, product.photo
  FROM order_list
  LEFT JOIN product ON order_list.id_product = product.id WHERE id_user = '${id_user}'`);
};

const insertOrder = (data) => {
  const {id_order, id_product, size, quantity_order, id_user} = data;
  return Pool.query(`INSERT INTO order_list(id_order, id_product, size, quantity_order, id_user) VALUES('${id_order}','${id_product}','${size}',${quantity_order},'${id_user}' )`);
};

const updateOrder = (data) => {
  const {id_order, id_product, size, quantity_order} = data;
  return Pool.query(`UPDATE order_list SET id_product = '${id_product}', size = '${size}', quantity_order = ${quantity_order} WHERE id_order = '${id_order}'`);
};

const deleteOrder = (id_order) => {
  return Pool.query(`DELETE FROM order_list WHERE id_order = '${id_order}'`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM order_list`);
};

const findId = (id_order) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id_order FROM order_list WHERE id_order='${id_order}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId,
};
