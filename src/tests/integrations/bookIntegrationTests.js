/* global it */
/* global describe */

var should = require('should'),
	supertest = require('supertest'),
	app = require('../../app'),
	mongoose = require('mongoose');

describe('Book crud test', function () {
	var _id;
	
	it('Should allow a book to be posted and return a read and _id', function (done) {
		var bookPost = { title: 'New Book Test', author: 'Integration Tests', genre: 'Fiction' };

		supertest(app)
			.post('/api/books')
			.send(bookPost)
			.expect(201)
			.end(function (err, res) {
				res.body.read.should.equal(false);
				res.body.should.have.property('_id');
				_id = res.body._id;
				done();
			});
	});

	it('Should allow a book to be removed', function (done) {
		supertest(app)
			.delete('/api/books/'+_id)
			.expect(204)
			.end(function (err, res){
				if(err) 
					done(err);
				else
					done();
			});
	});
});