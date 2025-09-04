# 🏪 Что хранится в Redux Store и зачем?

## 📊 **Структура Redux Store:**

```javascript
{
  // 👤 ПОЛЬЗОВАТЕЛЬ
  user: {
    data: {
      id: 123,
      username: "berenice", 
      email: "test@example.com",
      created_at: "2024-01-01"
    },
    loading: false,  // идёт ли загрузка пользователя
    error: null      // ошибка при загрузке
  },

  // 📚 КНИГИ  
  books: {
    userBooks: [     // книги текущего пользователя
      { id: 1, title: "Моя книга", status: "published" },
      { id: 2, title: "Черновик", status: "draft" }
    ],
    publicBooks: [   // все публичные книги
      { id: 10, title: "Чужая книга", author: "Другой автор" }
    ],
    currentBook: {   // открытая сейчас книга
      id: 1, title: "Моя книга", chapters: [...]
    },
    filters: {       // фильтры для поиска
      search: "фэнтези",
      genre: "fantasy", 
      status: "published",
      sort: "created_at"
    },
    loading: {       // состояния загрузки
      userBooks: false,
      publicBooks: false, 
      currentBook: false
    },
    error: null
  },

  // 🏷️ ЖАНРЫ
  genres: {
    list: [          // список всех жанров
      { id: 1, name: "Фэнтези", slug: "fantasy" },
      { id: 2, name: "Романтика", slug: "romance" }
    ],
    loaded: true     // загружены ли жанры
  }
}
```

---

## 🎯 **Зачем это нужно?**

### **1. 👤 User State - Пользователь везде доступен**
```javascript
// ❌ Раньше: передавать через props
<Header user={user} />
<Dashboard user={user} />
<Profile user={user} />

// ✅ Теперь: любой компонент получает пользователя
const { user } = useUserRedux(); // В любом месте!
```

### **2. 📚 Books State - Умное управление книгами**
```javascript
// Загрузили один раз - используем везде:
const { userBooks } = useBooksRedux();

// Фильтры синхронизированы:
updateFilters({ genre: "fantasy" }); // Все списки обновятся

// Редактирование автоматически обновляет все списки:
updateBook(editedBook); // Обновится в userBooks И publicBooks
```

### **3. 🚀 Производительность**
```javascript
// Redux умно обновляет только изменённые компоненты:
dispatch(userActions.setUser(newUser)); 
// ↳ Обновятся только Header, Profile, Dashboard
// ↳ BookList не перерендерится - данные не изменились
```

---

## 🔧 **Практические примеры использования:**

### **Авторизация:**
```javascript
// Вход пользователя - один раз, работает везде:
const { login } = useUserRedux();
login(userData); // Header, Dashboard, Profile - все обновятся
```

### **Поиск книг:**
```javascript
// Фильтр применился - все списки синхронны:
const { updateFilters, loadPublicBooks } = useBooksRedux();
updateFilters({ search: "драконы" });
loadPublicBooks(); // Загрузит с новым фильтром
```

### **Редактирование книги:**
```javascript
// Отредактировали книгу - она обновилась везде:
const { updateBook } = useBooksRedux();
updateBook({ id: 1, title: "Новое название" });
// ↳ Обновится в "Мои книги", "Все книги", "Текущая книга"
```

---

## ⚡ **Почему это лучше старого подхода:**

### **❌ Было (Props Drilling):**
```
App (загрузил user)
 ↳ Header (передал user)
    ↳ AuthButtons (получил user)
 ↳ Dashboard (передал user) 
    ↳ Profile (получил user)
```

### **✅ Стало (Redux):**
```
Redux Store ← загрузил user один раз
     ↕
Any Component ← получает user напрямую
```

---

## 🐛 **Исправленная ошибка:**

**Проблема:** `setLoading is not a function`
**Причина:** В books slice loading был простым boolean, а код ожидал объект
**Решение:** Изменил структуру на:
```javascript
loading: {
  userBooks: false,
  publicBooks: false, 
  currentBook: false
}
```

Теперь можно отслеживать загрузку каждого типа данных отдельно! 🎉
