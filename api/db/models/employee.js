const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
	firstname: {
		type: String, required: [true, "can't be empty"],
	},
	lastname: {
		type: String, required: [true, "can't be empty"],
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "can't be empty"],
		index: true,
	},
	password: {
		type: String, required: [true, "can't be empty"],
	},
	type: {//type of profille {1=admin, 2=manager, 3=basic employee}
		type: Number,
		required: true,
	},
	createdate: {
		type: Date,
		required: true,
		default: new Date(),
	},
	token: {
		type: String,
		required: false,
		default: null,
	},
	contractdate: {//date of signing the contract
		type: Date,
		required: false,
		default: null,
	},
	position: {
		type: String,
		required: false,
		default: null,
	},
	phonenumber: {
		type: Number,
		required: false,
		default: null,
	},
});

module.exports = EmployeeSchema;