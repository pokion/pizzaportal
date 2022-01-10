const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const OrderModel = mongoose.model('Order');

	try {

		const { id } = req.body;

		if(!(id)) {
			res.status(400).send("All input is required");
			return 0;
		}

		const order = await OrderModel.findById(mongoose.Types.ObjectId(id));//search for id


		if(order){

			const userDelete = await order.deleteOne();
			const cheachIfDishExists = await OrderModel.findById(mongoose.Types.ObjectId(id));

			if(cheachIfDishExists === null){
				res.status(410).send("order removed");
			} else {
				res.status(500).send("Maybe not ? xD");
			}
			

		} else {
			res.status(404).send("Couldn't find order");
		}

	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}
}