const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const { update, id } = req.body;
	const EmployeeModel = mongoose.model('Employee');

	if(!(id && update)) {
		res.status(400).send("All input is required");
		return 0;
	}

	try {

		EmployeeModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), update, {"useFindAndModify": false}, (err, docs) => {

			if(err || docs == null){

				console.log(err);
				res.status(500).send(err);
			} else {

				console.log(docs)
				res.status(200).send('updated');
			}
		});

	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}
}