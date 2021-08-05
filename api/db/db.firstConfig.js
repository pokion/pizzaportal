const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
function firstConfig(){
	const employee = mongoose.model('Employee');
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync('admin', salt);
	
	employee.find({type: 1}, (err, docs) =>{
		//console.log(docs)
		if(docs.length == 0){
			employee({
				firstname: 'admin',
				lastname: 'nimda',
				email: 'admin@admin.pl',
				password: hash,
				type: 1,
			}).save()
			console.log('created admin account')
		}else{
			console.log('admin is there')
		}
	})
}

module.exports = firstConfig;