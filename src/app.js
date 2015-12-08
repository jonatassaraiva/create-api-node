/* global process */
var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var db;

if (process.env.ENV == 'IntegrationTests')
	db = mongoose.connect('mongodb://localhost/bookAPI_integrationTests');
else
	db = mongoose.connect('mongodb://localhost/bookAPI');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(require('./models/bookModel'));
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
	res.send('Welcome to API');
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Running API on localhost:' + port);
});


module.exports = app;