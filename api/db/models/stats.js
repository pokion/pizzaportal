const mongoose = require('mongoose');

const { Schema } = mongoose;

const StatsSchema = new Schema({
	where: {
		type: String, required: [true, "can't be empty"],
	},
	what: {
		type: String, required: [true, "can't be empty"],
	},
	date: {
		type: Date, required: [true, "can't be empty"],
	}
})

module.exports = StatsSchema;