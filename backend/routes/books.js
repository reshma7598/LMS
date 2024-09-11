const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Add a new book (POST)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { isbn, name, category, quantity, price } = req.body;
    const newBook = new Book({ isbn, name, category, quantity, price });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books (GET)
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book (PUT)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ msg: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book (DELETE)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();
// const Book = require('../models/book');
// const auth = require('../middleware/auth');
// const adminAuth = require('../middleware/adminAuth');

// // Multer config for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // Add a new book (POST)
// router.post('/', auth, adminAuth, upload.single('image'), async (req, res) => {
//   try {
//     const { isbn, name, category, quantity, price } = req.body;
//     const newBook = new Book({
//       isbn,
//       name,
//       category,
//       // quantity,
//       price,
//       image: req.file ? req.file.filename : '', // Storing the image filename
//     });
//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all books (GET)
// router.get('/', auth, async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update a book (PUT)
// router.put('/:id', auth, adminAuth, upload.single('image'), async (req, res) => {
//   try {
//     const updatedData = {
//       ...req.body,
//       image: req.file ? req.file.filename : req.body.image, // Update image if provided
//     };
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!updatedBook) return res.status(404).json({ msg: 'Book not found' });
//     res.json(updatedBook);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete a book (DELETE)
// router.delete('/:id', auth, adminAuth, async (req, res) => {
//   try {
//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook) return res.status(404).json({ msg: 'Book not found' });
//     res.json({ msg: 'Book deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
