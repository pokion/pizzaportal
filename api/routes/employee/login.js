const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	const EmployeeModel = mongoose.model('Employee');
	try {
		const {  password, email } = req.body;

		if(!(email && password)) {
			res.status(400).send("All input is required");
		}

		const user = await EmployeeModel.findOne({ email });

		if(user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
					{ user_id: user._id, email},
					new Date(user.createdate).getTime()+'',
					{
						expiresIn: "1h",
					}
				);
			user.token = token;
			user.save();
			let dataUser = {
				token: user.token
			}
			res.status(200).json(dataUser);
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err)
	}
};