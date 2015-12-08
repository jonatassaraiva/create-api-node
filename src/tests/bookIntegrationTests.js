/* global afterEach */
/* global it */
/* global describe */

var should = require('should'),
	supertest = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Book = mongoose.model('book'),
	agent = supertest.agent(app);

describe('Book crud test', function () {
	it('Should allow a book to be posted and return a read and _id', function (done) {
		var bookPost = { title: 'New Book Test', author: 'Integration Tests', genre: 'Fiction' };
		
		agent.post('/api/books')
			.send(bookPost)
			.expect(201)
			.end(function(err, res){
				res.body.read.should.equal(false);
				res.body.should.have.property('_id');
				done();
			});
	});
	
	afterEach(function(done){
		Book.remove().exec();
		done();
	});
});