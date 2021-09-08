const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
	name: {
		type: String, required: [true, "can't be empty"],
	},
	ingredients: {
		type: [String], required: [true, "can't be empty"],
	},
	ingredientsRemove: {
		type: [String]
	},
	ingredientsAdd: {
		type: [String]
	},
	date: {
		type: Date,
		required: true,
		default: new Date(),
	},
	location: {
		type: String, required: [true, "can't be empty"]
	},
	status: {
		type: String
	}
})

module.exports = OrderSchema;