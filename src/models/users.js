const Pool = require('../config/db');

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const selectUsers = (id) => {
  return Pool.query(`SELECT * FROM users WHERE id = '${id}'`);
};

const createUser = (data) => {
  const {id, email, passwordHash, fullname, role} = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id,email,password,fullname,role) VALUES ('${id}','${email}','${passwordHash}','${fullname}','${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const createSeller = (data) => {
  const {id, email, passwordHash, fullname, role, phone, store_name} = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id,email,password,fullname,role,phone,store_name) VALUES ('${id}','${email}','${passwordHash}','${fullname}','${role}','${phone}','${store_name}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const allUser = () => {
  return Pool.query(`SELECT * FROM users`);
};

module.exports = {
  findEmail,
  createUser,
  createSeller,
  allUser,
  selectUsers,
};
