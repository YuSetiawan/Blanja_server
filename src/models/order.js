const Pool = require('../config/db');
const selectAll = ({limit, offset, sort, sortby}) => {
  return Pool.query(`
  SELECT *
  FROM order_table
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `);
};
const select = (id) => {
  return Pool.query(` SELECT *
  FROM order_table
  WHERE order_table.id = '${id}'`);
};

const selectByUserId = (users_id) => {
  return Pool.query(`
    SELECT * 
    FROM order_table 
    LEFT JOIN product 
    ON CAST(order_table.product_id AS VARCHAR) = product.id
    WHERE order_table.users_id='${users_id}';
  `);
};

const insert = (data) => {
  const {product_id, quantity, order_date, product_size, users_id} = data;
  return Pool.query(`INSERT INTO order_table ( product_id, quantity, order_date,product_size,users_id) VALUES ( '${product_id}', ${quantity}, '${order_date}', '${product_size}', '${users_id}')`);
};
const update = (data) => {
  const {id, quantity, order_date} = data;
  return Pool.query(`UPDATE order_table SET quantity=${quantity}, order_date='${order_date}'  WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM order_table WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM order_table');
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM order_table WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
  selectByUserId,
};
