const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

	const EmployeeModel = mongoose.model('Employee');
	
	try {
		const {  password, email } = req.body;

		if(!(email && password)) {
			res.status(400).send("All input is required");
			return 0;
		}

		const user = await EmployeeModel.findOne({ email });

		if(user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
					{ user_id: user._id, email},
					new Date(user.createdate).getTime()+'',
					{
						expiresIn: "8h",
					}
				);
			user.token = token;
			user.save();
			let dataUser = {
				token: user.token
			}
			res.set('x-access-token', user.token);
			res.cookie('token', user.token, {expires: new Date(Date.now() + 900000)})
			res.redirect(302, '/admin/panel');
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err)
	}
};