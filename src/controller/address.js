const {v4: uuidv4} = require('uuid');
const {selectAll, select, countData, findId, insert, update, deleteData} = require('../models/address');
const commonHelper = require('../helper/common');

const shippingAddressController = {
  getAllShippingAddress: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      const result = await selectAll({limit, offset, sort, sortby});
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, 'get data success', pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getShippingAddress: (req, res) => {
    const id = String(req.params.id);
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success from database');
      })
      .catch((err) => res.send(err));
  },
  insertShippingAddress: async (req, res) => {
    const {name, users_id, address_as, address, phone, postal_code, city} = req.body;
    const id = uuidv4();
    const data = {
      id,
      name,
      users_id,
      address_as,
      address,
      phone,
      postal_code,
      city,
    };
    insert(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Create Product Success'))
      .catch((err) => res.send(err));
  },

  updateShippingAddress: async (req, res) => {
    try {
      const id = String(req.params.id);
      const {name, users_id, address_as, address, phone, postal_code, city} = req.body;
      const {rowCount} = await findId(id);
      if (!rowCount) {
        return next(createError(403, 'ID is Not Found'));
      }
      const data = {
        id,
        name,
        users_id,
        address_as,
        address,
        phone,
        postal_code,
        city,
      };
      update(data)
        .then((result) => commonHelper.response(res, result.rows, 200, 'ShippingAddress updated'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteShippingAddress: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const {rowCount} = await findId(id);
      if (!rowCount) {
        return next(createError(403, 'ID is Not Found'));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, 'ShippingAddress deleted'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = shippingAddressController;
