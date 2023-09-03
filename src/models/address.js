const Pool = require('../config/db');

const selectAll = ({limit, offset, sort, sortby}) => {
  return Pool.query(`
  SELECT *
  FROM
  address
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};
const select = (id) => {
  return Pool.query(`SELECT * FROM address WHERE users_id='${id}'`);
};
const insert = (data) => {
  const {id, name, address_as, address, phone, postal_code, city, users_id} = data;
  return Pool.query(`INSERT INTO address (id, name, address_as,  address,  phone, postal_code, city, users_id) VALUES('${id}','${name}','${address_as}','${address}','${phone}','${postal_code}', '${city}', '${users_id}')`);
};
const update = (data) => {
  const {id, name, users_id, address_as, address, phone, postal_code, city} = data;
  return Pool.query(`UPDATE address SET name='${name}', users_id='${users_id}' address_as='${address_as}', address='${address}' ,phone='${phone}' ,postal_code='${postal_code}', city='${city}' WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM address WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM address');
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM address WHERE id='${id}'`, (error, result) => {
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
};
