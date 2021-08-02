const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	const EmployeeModel = mongoose.model('Employee');
	try {
		const { firstname, lastname, email, password, type, token } = req.body;
		if(!(firstname && lastname && email  && password && type)){
			res.status(401).send('All input is required');
		}

		let user = await EmployeeModel.findOne({ email });
		const adminUser = await EmployeeModel.findOne({ token });

		if(adminUser){
			if(adminUser.type !== 1){
				res.status(400).send("Invalid Credentials 1");
			}
		} else {
			res.status(400).send("Invalid Credentials 2");
		}

		//create hash
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		if(!user){
			EmployeeModel({
				firstname,
				lastname,
				email: email.toLowerCase(),
				password: hash,
				type,
				createdate: req.body.createdate || undefined,
				position: req.body.position || undefined,
				phonenumber: req.body.phonenumber || undefined
			}).save();
			
			res.status(200).send("Employee added");
		} else {
			res.status(406).send('Email is here')
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err)
	}
}