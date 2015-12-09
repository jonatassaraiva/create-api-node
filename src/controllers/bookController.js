var bookController = function (Book) {

    var _post = function (req, res) {
        var book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var _get = function (req, res) {
        var query = {};

        if (req.query.genre || req.query.author)
            query = req.query;

        Book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err);
            else
            {
                var returnBooks = [];
                books.forEach(function(element) {
                    var bookWithLinks = element.toJSON();
                    bookWithLinks.links = {
                        self: 'http://' + req.headers.host + '/api/books/' + element._id
                    };
                    
                    returnBooks.push(bookWithLinks);
                });
                
                res.json(returnBooks);                                
            }
        });
    };

    var _getByIdMiddleware = function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else
                res.status(404).send('Book not found');
        });
    };

    var _getById = function (req, res) {
        var bookWithLinks = req.book.toJSON();
     
        bookWithLinks.links = {
            filterByThisGenre: 'http://' + req.headers.host + '/api/books/?genre=' + req.book.genre.replace(/ /g, '%20'),
            filterByThisAuthor: 'http://' + req.headers.host + '/api/books/?author=' + req.book.author.replace(/ /g, '%20')
        };
        
        res.json(bookWithLinks);
    };

    var _put = function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;

                req.book.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.book);
                });
            }
        });
    };

    var _patch = function (req, res) {
        if (req.body._id)
            delete req.body._id;

        for (var prop in req.body)
            req.book[prop] = req.body[prop];

        req.book.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.json(req.book);
        });
    };

    var _delete = function (req, res) {
        req.book.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(204).send('Book removed');
        });
    };

    return {
        post: _post,
        get: _get,
        getByIdMiddleware: _getByIdMiddleware,
        getById: _getById,
        put: _put,
        patch: _patch,
        delete: _delete
    };
};

module.exports = bookController;