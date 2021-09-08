const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const MenuModel = mongoose.model('Menu');

	try {

		const { name, price, category, ingredients } = req.body;

		if(!(name && price && category && ingredients)) {
			res.status(400).send("All input is required");
			return 0;
		}

		MenuModel({

			name,
			price,
			category,
			ingredients,
		}).save();
		res.status(201).send("Dish added");

	} catch (err){
		
		console.log(err);
		res.status(500).send(err)
	}
}