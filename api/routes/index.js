const routes = require('express').Router();
const bodyParser = require('body-parser');

//Require routes
const employee = require('./employee');

//configuration bodyParser
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

//simple logging system
routes.use((req, res, next) => {
	console.log(`Resource requested: ${req.method} ${req.originalURL}`);
	next();
})

routes.use('/employee', employee);

module.exports = routes;