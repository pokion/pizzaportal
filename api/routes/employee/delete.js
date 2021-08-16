const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const EmployeeModel = mongoose.model('Employee');

	try {

		const { id } = req.body;

		if(!(id)) {
			res.status(400).send("All input is required");
			return 0;
		}

		const user = await EmployeeModel.findById(mongoose.Types.ObjectId(id));//search for id


		if(user){

			const userDelete = await user.deleteOne();
			const cheachIfUserExists = await EmployeeModel.findById(mongoose.Types.ObjectId(id));

			if(cheachIfUserExists === null){
				res.status(410).send("Employee removed");
			} else {
				res.status(500).send("Maybe not ? xD");
			}
			

		} else {
			res.status(404).send("Couldn't find account");
		}

	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}
}