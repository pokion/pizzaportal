const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

	const EmployeeModel = mongoose.model('Employee');

	try {

		const { firstname, lastname, email, password, type, token } = req.body;
		
		if(!(firstname && lastname && email  && password && type)){
			res.status(401).send('All input is required');
			return 0;
		}

		let user = await EmployeeModel.findOne({ email });//search for email if duplicate

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
				position: req.body.position || null,
				phonenumber: req.body.phonenumber || null,
				contractdate: req.body.contractdate || null,
			}).save();
			
			res.status(201).send("Employee added");
		} else {

			res.status(406).send('Email is here');
		}
	} catch (err) {

		console.log(err);
		res.status(500).send(err)
	}
}