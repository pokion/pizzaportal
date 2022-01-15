const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const OrderModel = mongoose.model('Order');

	try {

		const { nameUser, ids, location, phoneNumber, description } = req.body;

		if(!(ids && location && nameUser && phoneNumber)) {
			res.status(400).send("All input is required");
			return 0;
		} else {
			OrderModel({

				ids,
				nameUser,
				phoneNumber,
				date: new Date(),
				location,
				description: description || null
			}).save();
		res.status(201).json({order:"Order added"});
		}

	} catch (err){

		console.log(err);
		res.status(500).json({order: err});
	}
}