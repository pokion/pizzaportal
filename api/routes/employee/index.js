const employee = require('express').Router();

//routes
const login = require('./login');
const register = require('./register');
const del = require('./delete');
const get = require('./get');
const up = require('./update');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');

employee.post('/', login);
/*
POST
	require
	-email
	-password
	return
	-token
*/
employee.put('/', [tokenValid, permissionValid], register);
/*
PUT
	require
	-firstname
	-lastname
	-email
	-password
	-type
	-token
	return
	-status about account
*/
employee.delete('/', [tokenValid, permissionValid], del);
/*
DELETE
	require
	-token
	-id
	return
	-status about account
*/
employee.get('/', [tokenValid, permissionValid], get);
/*
GET
	require
	null
	return
	-all employess important informations
*/
employee.patch('/', [tokenValid, permissionValid], up);

module.exports = employee;