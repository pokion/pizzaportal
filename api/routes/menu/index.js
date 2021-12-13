const menu = require('express').Router();

//routes
const add = require('./add');
const getMenu = require('./get');
const up = require('./update');
const del = require('./delete');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');
const cookieParser = require.main.require('./api/validation/cookieParser');


menu.put('/', [cookieParser, tokenValid, permissionValid], add);
menu.get('/', getMenu);
menu.patch('/', [cookieParser, tokenValid, permissionValid], up);
menu.delete('/', [cookieParser, tokenValid, permissionValid], del);

module.exports = menu;