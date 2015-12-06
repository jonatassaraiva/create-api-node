var express = require('express');

var routes = function (Book) {

	var bookRouter = express.Router();

	bookRouter.route('/books')
		.post(function (req, rep) {
			var book = new Book(req.body);
			book.save();

			rep.status(201).send(book);
		})
		.get(function (req, rep) {

			var query = {};

			if (req.query.genre || req.query.author)
				query = req.query;

			Book.find(query, function (err, books) {
				if (err)
					rep.status(500).send(err);
				else
					rep.json(books);
			});
		});

	bookRouter.route('/books/:bookId')
		.get(function (req, rep) {

			Book.findById(req.params.bookId, function (err, book) {
				if (err)
					rep.status(500).send(err);
				else
					rep.json(book);
			});
		});

	return bookRouter;
};

module.exports = routes;