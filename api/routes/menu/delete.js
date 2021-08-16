const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const MenuModel = mongoose.model('Menu');

	try {

		const { id } = req.body;

		if(!(id)) {
			res.status(400).send("All input is required");
			return 0;
		}

		const dish = await MenuModel.findById(mongoose.Types.ObjectId(id));//search for id


		if(dish){

			const userDelete = await dish.deleteOne();
			const cheachIfDishExists = await MenuModel.findById(mongoose.Types.ObjectId(id));

			if(cheachIfDishExists === null){
				res.status(410).send("dish removed");
			} else {
				res.status(500).send("Maybe not ? xD");
			}
			

		} else {
			res.status(404).send("Couldn't find dish");
		}

	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}
}