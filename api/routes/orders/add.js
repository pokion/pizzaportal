const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const OrderModel = mongoose.model('Order');
	const MenuModel = mongoose.model('Menu');

	try {

		const { ingredientsAdd, ingredientsRemove, id, date, location } = req.body;

		if(!(id && location)) {
			res.status(400).send("All input is required");
			return 0;
		}

		let dish = await MenuModel.findById(mongoose.Types.ObjectId(id));

		if(dish == null){
			console.log(err);
			res.status(500).send(err);

		} else {
			OrderModel({

				name: dish.name,
				ingredients: dish.ingredients,
				ingredientsRemove: ingredientsRemove || null,
				ingredientsAdd: ingredientsAdd || null,
				date: date || new Date(),
				location,
				status: "Złożono zamówienie"
			}).save();
		res.status(201).send("Order added");
		}

	} catch (err){

		console.log(err);
		res.status(500).send(err);
	}
}