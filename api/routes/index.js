const routes = require('express').Router();
const bodyParser = require('body-parser');

//Require routes
const employee = require('./employee');
const menu = require('./menu');
const order = require('./orders');

//configuration bodyParser
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

//simple logging system
routes.use((req, res, next) => {
	console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
	next();
})

routes.use('/employee', employee);
routes.use('/menu', menu);
routes.use('/order', order);

module.exports = routes;