const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
	ids: {
		type: [{id:String, value: Number}], 
		required: [true, "can't be empty"],
	},
	date: {
		type: Date,
		required: true,
		default: new Date(),
	},
	nameUser: {
		type: String,
		required: true
	},
	location: {
		type: String, 
		required: [true, "can't be empty"]
	},
	description: {
		type: String
	},
	phoneNumber: {
		type: Number,
		required: true
	}
})

module.exports = OrderSchema;