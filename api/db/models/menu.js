const mongoose = require('mongoose');

const { Schema } = mongoose;

const MenuSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
	},
});

module.exports = MenuSchema;