/* global process */
var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/booksRoute')(require('./modules/bookModel'));
app.use('/api', bookRouter);

app.get('/', function (req, res) {
	res.send('Welcome to API');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Gulp is running API on localhost:' + port);
});