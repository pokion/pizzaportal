require('./api/db/db.connect');

const app = require('express')();
const mongoose = require('mongoose');
const routes = require(__dirname + '/api/routes');

const port = process.env.PORT || 3000;


app.use('/', routes);

app.listen(port);

console.log(`Server started on port ${port}`);