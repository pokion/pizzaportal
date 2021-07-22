module.exports = {
	name: 'pizzaportal',
	host: process.env.HOST_MONGODB || '127.0.0.1:27017',
	opts: {
		promiseLibrary: global.Promise,
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	},
};