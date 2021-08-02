const employee = require('express').Router();

//routes
const login = require('./login');
const register = require('./register');

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');

employee.post('/login', login);
employee.post('/register', tokenValid, register);

module.exports = employee;