const mongoose = require('mongoose');
const firstConfig = require('./db.firstConfig');

//models
const EmployeeSchema = require('./models/employee');

const db = require('./db.config');

mongoose.connect(`mongodb://${db.host}/${db.name}`, db.opts);

mongoose.connection.on('connected', () => {
	mongoose.model('Employee', EmployeeSchema);
	console.log("cennect to database " + db.host)

	firstConfig();
});