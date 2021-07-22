const mongoose = require('mongoose');

//models
const EmployeeSchema = require('./models/employee');

const db = require('./db.config');

mongoose.connect(`mongodb://${db.host}/${db.name}`, db.opts);

mongoose.connection.on('connected', () => {
	mongoose.model('Employee', EmployeeSchema);

	const employee = mongoose.model('Employee');

	employee.find({type: 1}, (err, docs) =>{
		console.log(docs)
		if(docs.length == 0){
			employee({
				firstname: 'admin',
				lastname: 'nimda',
				email: 'admin@admin.pl',
				password: 'admin',
				type: 1,
			}).save()
			console.log('created admin account')
		}else{
			console.log('admin is there')
		}
	})
});