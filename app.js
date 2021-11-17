require('./api/db/db.connect');

const express = require('express')
const app = express();
const mongoose = require('mongoose');
const routes = require(__dirname + '/api/routes');

const port = 3000;

app.use(express.static('public'))
app.use('/', routes);

app.listen(port);

console.log(`Api started on port ${port}`);