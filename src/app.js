/* global process */
var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.send('Welcome to API');
});

app.listen(port, function(){
	console.log('Gulp is running API on localhost:'+port);
});