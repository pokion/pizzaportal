const mongoose = require('mongoose');

module.exports = async (req, res) => {

	const MenuModel = mongoose.model('Menu');
	const { category } = req.body;

	try {

		if(!(category)){
			let user = await MenuModel.find().select("-__v");

			res.status(500).send(user);
		}else if(category){
			let user = await MenuModel.find({ category }).select("-__v");

			res.status(500).send(user);
		}


	} catch (err) {

		console.log(err);
		res.status(500).send(err);
	}

}