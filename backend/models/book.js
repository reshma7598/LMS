const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true }, // ISBN stored as a string
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;

// const mongoose = require('mongoose');
// const BookSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     quantity: { type: Number, required: true },
//     isbn: { type: String, required: true },
//     image: { type: String }, // Add this field for the image URL
//   });
  