/* global process */
var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
	.get(function (req, rep) {
		var responseJson = {
			hellow: 'This is json response'
		};
		
		rep.json(responseJson);
	});

app.use('/api', bookRouter);

app.get('/', function (req, res) {
	res.send('Welcome to API');
});

app.listen(port, function () {
	console.log('Gulp is running API on localhost:' + port);
});