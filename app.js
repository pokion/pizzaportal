require('./api/db/db.connect');

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require(__dirname + '/api/routes');
const routesAdmin = require(__dirname + '/admin/adminRoute.js');

const port = 3000;

app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'admin/assets')));
app.use('/', routes);
app.use('/admin', routesAdmin);
app.use(cookieParser());

app.listen(port);

console.log(`Api started on port ${port}`);