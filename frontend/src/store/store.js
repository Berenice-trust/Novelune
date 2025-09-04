// Пример структуры Redux для вашего проекта
import { configureStore, createSlice } from '@reduxjs/toolkit';

// User slice - заменит useUser hook
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: true,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  }
});

// Books slice - для управления списками книг
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    userBooks: [],
    publicBooks: [],
    currentBook: null,
    filters: {
      genre: '',
      search: '',
      status: '',
      sort: 'created_at'
    },
    loading: {
      userBooks: false,
      publicBooks: false,
      currentBook: false
    },
    error: null
  },
  reducers: {
    setUserBooks: (state, action) => {
      state.userBooks = action.payload;
      state.loading.userBooks = false;
    },
    setPublicBooks: (state, action) => {
      state.publicBooks = action.payload;
      state.loading.publicBooks = false;
    },
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
      state.loading.currentBook = false;
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading.userBooks = false;
      state.loading.publicBooks = false;
      state.loading.currentBook = false;
    },
    addBook: (state, action) => {
      state.userBooks.push(action.payload);
    },
    updateBook: (state, action) => {
      const bookLists = ['userBooks', 'publicBooks'];
      bookLists.forEach(listName => {
        const index = state[listName].findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state[listName][index] = action.payload;
        }
      });
    },
    deleteBook: (state, action) => {
      const bookId = action.payload;
      state.userBooks = state.userBooks.filter(b => b.id !== bookId);
      state.publicBooks = state.publicBooks.filter(b => b.id !== bookId);
    }
  }
});

// Genres slice - для кэширования жанров
const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setGenres: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    }
  }
});

// Configure store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    books: booksSlice.reducer,
    genres: genresSlice.reducer
  }
});

// Export actions
export const userActions = userSlice.actions;
export const booksActions = booksSlice.actions;
export const genresActions = genresSlice.actions;
