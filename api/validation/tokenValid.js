const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || res.locals.cookie.token;

	if(!token){
		return res.status(403).send('A token is required for authentication');
	}

	try {
		const EmployeeModel = mongoose.model('Employee');
		const user = await EmployeeModel.findOne({ token });

		if(user === null){
			return res.status(401).send('Invalid Token');
		} else {
			const decoded = jwt.verify(token, new Date(user.createdate).getTime()+'');

			if(decoded.user_id == user._id && decoded.email == user.email){
				return next();
			} else {
				return res.status(401).send('Invalid Token');
			}
		}
	} catch (err) {
		console.log(err)
		return res.status(401).send(err);
	}
};