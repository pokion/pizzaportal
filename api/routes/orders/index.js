const order = require('express').Router();

//routes
const add = require('./add');
const get = require('./get');
const update = require('./update');
const del = require('./delete');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');
const cookieParser = require.main.require('./api/validation/cookieParser');

order.put('/', add);
order.get('/', [cookieParser, tokenValid, permissionValid], get);
order.patch('/', [cookieParser, tokenValid, permissionValid], update);
order.delete('/', [cookieParser, tokenValid, permissionValid], del);

module.exports = order;