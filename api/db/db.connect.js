const mongoose = require('mongoose');
const firstConfig = require('./db.firstConfig');

//models
const EmployeeSchema = require('./models/employee');
const MenuSchema = require('./models/menu');
const StatsSchema = require('./models/stats');
const OrderSchema = require('./models/orders');

const db = require('./db.config');

mongoose.connect(`mongodb://${db.host}/${db.name}`, db.opts);

mongoose.connection.on('connected', () => {
	mongoose.model('Employee', EmployeeSchema);
	mongoose.model('Menu', MenuSchema);
	mongoose.model('Stats', MenuSchema);
	mongoose.model('Order', OrderSchema);
	console.log("cennect to database " + db.host)

	firstConfig();
});