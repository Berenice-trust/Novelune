// hooks/useBooksRedux.js - Hook для работы с книгами через Redux
"use client";
import { useSelector, useDispatch } from 'react-redux';
import { booksActions } from '../store/store';

export function useBooksRedux() {
  const { 
    userBooks, 
    publicBooks, 
    currentBook, 
    filters, 
    loading, 
    error 
  } = useSelector(state => state.books);
  
  const dispatch = useDispatch();

  // Загрузка книг пользователя
  const loadUserBooks = async () => {
    if (loading.userBooks) return;
    
    dispatch(booksActions.setLoading({ type: 'userBooks', loading: true }));
    
    try {
      const response = await fetch('/api/books/my', { credentials: 'include' });
      const data = await response.json();
      
      if (data.success) {
        dispatch(booksActions.setUserBooks(data.books || []));
      } else {
        dispatch(booksActions.setError(data.message));
      }
    } catch (error) {
      dispatch(booksActions.setError(error.message));
      dispatch(booksActions.setUserBooks([])); // Fallback к пустому массиву
    }
  };

  // Загрузка публичных книг (пока заглушка)  
  const loadPublicBooks = async (searchFilters = {}) => {
    console.log('Заглушка: loadPublicBooks');
    dispatch(booksActions.setPublicBooks([]));
  };

  // Загрузка конкретной книги (пока заглушка)
  const loadBook = async (bookId) => {
    console.log('Заглушка: loadBook', bookId);
    dispatch(booksActions.setCurrentBook(null));
  };

  // Очистка текущей книги
  const clearCurrentBook = () => {
    dispatch(booksActions.clearCurrentBook());
  };

  // Обновление фильтров
  const updateFilters = (newFilters) => {
    dispatch(booksActions.setFilters(newFilters));
  };

  return {
    // Данные
    userBooks,
    publicBooks,
    currentBook,
    filters,
    loading,
    error,
    
    // Действия
    loadUserBooks,
    loadPublicBooks,
    loadBook,
    clearCurrentBook,
    updateFilters
  };
}
