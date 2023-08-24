const {v4: uuidv4} = require('uuid');
const createError = require('http-errors');
const {selectAll, select, countData, findId, insert, update, deleteData, selectByUserId} = require('../models/order');
const commonHelper = require('../helper/common');
const categoryController = {
  getAllOrder: async (req, res, next) => {
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
  getOrder: (req, res, next) => {
    const id = uuidv4();
    select(id)
      .then((result) => {
        const rows = result.rows;
        const multipliedRows = rows.map((row) => {
          const quantity = Number(row.quantity);
          const price = Number(row.price);
          const total = quantity * price;
          return {...row, total};
        });
        commonHelper.response(res, multipliedRows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },
  getOrderByUserId: (req, res, next) => {
    const users_id = req.query.users_id;
    selectByUserId(users_id)
      .then((result) => {
        console.log(result);
        const data = result.rows;
        const resData = data.map((item) => {
          const quantity = item.quantity;
          const price = item.price;
          const totalPrice = quantity * price;
          const val = {
            id: item.id,
            quantity: item.quantity,
            product_size: item.product_size,
            order_date: item.order_date,
            users_id: item.users_id,
            product: {
              name: item.name,
              price: totalPrice,
            },
            payment_status: item.payment_status,
          };
          return val;
        });
        return commonHelper.response(res, resData, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  insertOrder: async (req, res) => {
    const {product_id, quantity, product_size, users_id} = req.body;
    const id = uuidv4();
    const order_date = new Date().toISOString();
    const data = {
      id,
      product_id,
      quantity,
      order_date,
      product_size,
      users_id,
    };
    await insert(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Create Product Success'))
      .catch((err) => console.log(err));
  },

  updateOrder: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const {quantity} = req.body;
      const order_date = new Date().toISOString();
      const {rowCount} = await findId(id);
      if (!rowCount) {
        return next(createError(403, 'ID is Not Found'));
      }
      const data = {
        id,
        quantity,
        order_date,
      };
      await update(data).then((result) => commonHelper.response(res, result.rows, 200, 'Order updated'));
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const {rowCount} = await findId(id);
      console.log(id);
      if (!rowCount) {
        return next(createError(403, 'ID is Not Found'));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, 'Order deleted'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryController;
