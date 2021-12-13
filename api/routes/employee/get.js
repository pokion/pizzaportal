const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const EmployeeModel = mongoose.model('Employee');

	try {
		let user = await EmployeeModel.find().select("-token -password -__v");

		res.status(200).send(user);

	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}

}