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
const cookieParser = require.main.require('./api/validation/cookieParser');

employee.post('/', login);
/*
POST
	require
	-email *string
	-password *string
	return
	-token *string
*/
employee.put('/', [cookieParser, tokenValid, permissionValid], register);
/*
PUT
	require
	-firstname *string
	-lastname *string
	-email *string
	-password *string
	-type *number
	-token *string
	return
	-status about account *string
*/
employee.delete('/', [cookieParser, tokenValid, permissionValid], del);
/*
DELETE
	require
	-token *string 
	-id *string
	return
	-status about account *string
*/
employee.get('/', [cookieParser, tokenValid, permissionValid], get);
/*
GET
	require
	null
	return
	-all employess important informations *array of objects
*/
employee.patch('/', [cookieParser, tokenValid, permissionValid], up);
/*
PATCH
	require
	-token *string
	-id *string
	-update *object
	return
	-status information *string
*/

module.exports = employee;