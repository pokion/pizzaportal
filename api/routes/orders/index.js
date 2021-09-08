const order = require('express').Router();

//routes
const add = require('./add');
const get = require('./get');
const update = require('./update');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');

order.put('/', [tokenValid, permissionValid], add);
order.get('/', [tokenValid, permissionValid], get);
order.patch('/', [tokenValid, permissionValid], update);

module.exports = order;