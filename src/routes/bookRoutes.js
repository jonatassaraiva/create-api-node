var express = require('express');

var routes = function (Book) {
	var bookRouter = express.Router();

	var bookController = require('../controllers/bookController')(Book);

	bookRouter.route('/')
		.post(bookController.post)
		.get(bookController.get);

	bookRouter.use('/:bookId', bookController.getByIdMiddleware);
	bookRouter.route('/:bookId')
		.get(bookController.getById)
		.put(bookController.put)
		.patch(bookController.patch)
		.delete(bookController.delete);

	return bookRouter;
};

module.exports = routes;