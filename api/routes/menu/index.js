const menu = require('express').Router();

//routes
const add = require('./add');
const getMenu = require('./get');
const up = require('./update');
const del = require('./delete');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');

menu.put('/', [tokenValid, permissionValid], add);
menu.get('/', getMenu);
menu.patch('/', [tokenValid, permissionValid], up);
menu.delete('/', [tokenValid, permissionValid], del);

module.exports = menu;