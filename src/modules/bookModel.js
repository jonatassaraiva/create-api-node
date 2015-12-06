var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var bookModel = new Schema({
	title: { type: String },
	author: { type: String },
	genre: { type: String },
	read: { type: Boolean, default: false }
},{ versionKey: false });

module.exports = mongoose.model('book', bookModel);