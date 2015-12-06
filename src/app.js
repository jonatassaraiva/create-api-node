/* global process */
var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./modules/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
	.get(function (req, rep) {
		Book.find(function(err, books){
			if(err)
				rep.status(500).send(err);
			else
				rep.json(books);
		});
	});

app.use('/api', bookRouter);

app.get('/', function (req, res) {
	res.send('Welcome to API');
});

app.listen(port, function () {
	console.log('Gulp is running API on localhost:' + port);
});