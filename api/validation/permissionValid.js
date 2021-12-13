const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {

	const EmployeeModel = mongoose.model('Employee');
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || res.locals.cookie.token;

	const adminUser = await EmployeeModel.findOne({ token });

	if(adminUser){//see if token is valid in database

		if(adminUser.type !== 1){

			res.status(400).send("Invalid Credentials 1");//see if account is a admin
		}
	} else {

		res.status(400).send("Invalid Credentials");
	}

	return next();
}