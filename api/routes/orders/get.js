const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const OrderModel = mongoose.model('Order');

	let data = await OrderModel.find().select("-__v");

	res.status(200).send(data);
}