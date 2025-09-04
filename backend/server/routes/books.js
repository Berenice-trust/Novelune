// routes/books.js - API роуты для книг
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const auth = require('../middleware/auth');

// GET /api/books/my - получить книги текущего пользователя
router.get('/my', auth, async (req, res) => {
  try {
    const books = await Book.getBooksByUserId(req.user.id);
    res.json({ success: true, books });
  } catch (error) {
    console.error('Ошибка получения книг пользователя:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

// GET /api/books/public - получить публичные книги
router.get('/public', async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json({ success: true, books });
  } catch (error) {
    console.error('Ошибка получения публичных книг:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

// GET /api/books/:id - получить конкретную книгу
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Книга не найдена' });
    }
    res.json({ success: true, book });
  } catch (error) {
    console.error('Ошибка получения книги:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

module.exports = router;
