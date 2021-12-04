const admin = require('express').Router();
const path = require('path')

//middelware
const tokenValid = require.main.require('./api/validation/tokenValid');
const permissionValid = require.main.require('./api/validation/permissionValid');

admin.get('/', async (req,res) => {
	res.sendFile(path.join(__dirname, '/login.html'))
})

admin.get('/panel', tokenValid ,async (req,res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

module.exports = admin;