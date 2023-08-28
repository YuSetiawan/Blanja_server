const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {findEmail, createUser, createSeller, allUser} = require('../models/users');
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');

const userController = {
  register: async (req, res, next) => {
    try {
      const {email, password, fullname} = req.body;
      const {rowCount} = await findEmail(email);
      if (rowCount) {
        return next(createError(403, 'Email is already used'));
      }
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4();
      const data = {
        id,
        email,
        passwordHash,
        fullname,
        role: 'customer',
      };
      await createUser(data)
        .then((result) => commonHelper.response(res, result.rows, 201, 'created'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  registerSeller: async (req, res, next) => {
    try {
      const {email, password, fullname, role, phone, store_name} = req.body;
      const {rowCount} = await findEmail(email);
      if (rowCount) {
        return next(createError(403, 'Email is already used'));
      }
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4();
      const data = {
        id,
        email,
        passwordHash,
        fullname,
        role: 'seller',
        phone,
        store_name,
      };
      await createSeller(data)
        .then((result) => commonHelper.response(res, result.rows, 201, 'created'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const {
        rows: [users],
      } = await findEmail(email);
      if (!users) {
        return commonHelper.response(res, null, 403, 'Email is invalid');
      }
      const isValidPassword = bcrypt.compareSync(password, users.password);
      console.log(isValidPassword);

      if (!isValidPassword) {
        return commonHelper.response(res, null, 403, 'Password is invalid');
      }
      delete users.password;
      const payload = {
        email: users.email,
        role: users.role,
      };
      users.token = authHelper.generateToken(payload);
      users.refreshToken = authHelper.generateRefershToken(payload);

      commonHelper.response(res, users, 201, 'login is successful');
    } catch (error) {
      console.log(error);
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefershToken(payload),
    };
    commonHelper.response(res, result, 200, 'Token is Already generated');
  },

  user: async (req, res) => {
    try {
      const result = await allUser();
      return res.status(200).json({
        message: 'here all data',
        data: result.rows,
      });
    } catch (error) {
      return res.status(404).json({
        message: 'something went wrong',
      });
    }
  },
};

module.exports = userController;
